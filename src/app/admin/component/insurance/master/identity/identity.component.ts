import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { IdentityService }                                        from './identity.service'
import { GetCurrentUserService }                                  from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                             from '../../../../component/log-management/log.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {

  identityForm      : FormGroup
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  edited            : Boolean   = false

  constructor(private fb                          : FormBuilder,
              private dynamicScriptLoader         : DynamicScriptLoaderService,
              private cd                          : ChangeDetectorRef,
              private identityService             : IdentityService,
              private logService                  : LogService,
              private getCurrentUserService       : GetCurrentUserService,
              private sweetalertService           : SweetalertService,) { }

  ngOnInit( ) {
    this.loadForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editIdentity', function(){
      let id = $(this).data('id');
      return self.identityService.getIdentityById(id)
                        .subscribe((data) => {
                          self.identityForm.setValue({
                            id              : data.id,
                            updateBy        : data.updateBy,
                            core_code       : data.core_code,
                            name            : data.name
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteIdentity', function(){
      let id = $(this).data('id');
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          return   self.identityService.destroyIdentity(id)
                    .subscribe(() => {
                      // save log
                      let user = self.getCurrentUserService.getUserData()
        
                      let message = "User " + user.name + " Delete Identity" + self.name.value

                      let category  = "Identity"
                
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {
                        self.sweetalertService.yourWorkHasBeenSaved('Identity Has Been Delete')

                        // Refresh Datatables after Save Identity
                        $('#identityDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Delete Identity
                        self.resetForm();
                      })
                    });
            }
          })
    });
  }

  private loadForm() {
    this.identityForm = this.fb.group({
      id                : [''],
      updateBy          : [''],
      core_code         : ['',[Validators.required]],
      name              : ['',[Validators.required]]
    })
  }

  public createIdentity() {
    let user = this.getCurrentUserService.getUserData()

    this.identityForm.patchValue({
      updateBy : user.name
    })

    this.identityService.saveIdentity(this.identityForm.value)
                .subscribe((data) => {
                  // save log
                  let user = this.getCurrentUserService.getUserData()
      
                  let message = null // siapin variable message

                  if(this.id.value)
                    message   = "User " + user.name + " Update Identity " + this.name.value
                  else 
                    message   = "User " + user.name + " Add new Identity"

                  let category  = "Identity"
            
                  const log = this.logService.storeLog(user, category, message).toPromise()

                  log.then(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Identity Has Been Save')

                    // Refresh Datatables after Save Identity
                    $('#identityDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Identity
                    this.resetForm();
                  })
                })
  }

  public resetForm() {
    this.id.reset()
    this.updateBy.reset()
    this.core_code.reset()
    this.name.reset()
  }

  get id(){
    return this.identityForm.get('id');
  }

  get updateBy(){
    return this.identityForm.get('updateBy');
  }

  get core_code(){
    return this.identityForm.get('core_code');
  }

  get name(){
    return this.identityForm.get('name');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#identityDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/id-type',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        order   : [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'core_code'
              }, {
                data : 'name'
              },{
                data : 'updateBy'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editIdentity"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteIdentity"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
            }
          }]
      });

    });
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables()
   }).catch(error => console.log(error));
  }

}
