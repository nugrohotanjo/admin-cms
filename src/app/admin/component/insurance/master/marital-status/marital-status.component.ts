import { Component, OnInit, ChangeDetectorRef }                   from '@angular/core';
import { FormBuilder, FormGroup, Validators }                     from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { MaritalStatusService }                                   from './marital-status.service'
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
  selector: 'app-marital-status',
  templateUrl: './marital-status.component.html',
  styleUrls: ['./marital-status.component.css']
})
export class MaritalStatusComponent implements OnInit {

  maritalstatusForm : FormGroup
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  edited            : Boolean   = false

  constructor(private fb                          : FormBuilder,
              private dynamicScriptLoader         : DynamicScriptLoaderService,
              private cd                          : ChangeDetectorRef,
              private maritalStatusService        : MaritalStatusService,
              private logService                  : LogService,
              private getCurrentUserService       : GetCurrentUserService,
              private sweetalertService           : SweetalertService,) { }

  ngOnInit( ) {
    this.loadForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editMaritalStatus', function(){
      let id = $(this).data('id');
      return self.maritalStatusService.getMaritalStatusById(id)
                        .subscribe((data) => {
                          self.maritalstatusForm.setValue({
                            id              : data.id,
                            updateBy        : data.updateBy,
                            marital_status_core_id       : data.marital_status_core_id,
                            name            : data.name
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteMaritalStatus', function(){
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
          return   self.maritalStatusService.destroyMarital(id)
                    .subscribe(() => {
                      // save log
                      let user = this.getCurrentUserService.getUserData()
        
                      let message = "User " + user.name + " Delete Marital Status" + this.name.value

                      let category  = "Marital Status"
                
                      const log = this.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {
                        this.sweetalertService.yourWorkHasBeenSaved('Marital Status Has Been Delete')

                        // Refresh Datatables after Save Marital Status
                        $('maritalstatusDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Delete Marital Status
                        this.resetForm();
                      })
                    });
            }
          })
    });
  }

  private loadForm() {
    this.maritalstatusForm = this.fb.group({
      id                            : [''],
      updateBy                      : [''],
      marital_status_core_id        : ['',[Validators.required]],
      name                          : ['',[Validators.required]]
    })
  }

  public createMaritalStatus() {
    let user = this.getCurrentUserService.getUserData()

    this.maritalstatusForm.patchValue({
      updateBy : user.name
    })

    this.maritalStatusService.saveMarital(this.maritalstatusForm.value)
                .subscribe((data) => {
                  // save log
                  let user = this.getCurrentUserService.getUserData()
      
                  let message = null // siapin variable message

                  if(this.id.value)
                    message   = "User " + user.name + " Update Marital Status " + this.name.value
                  else 
                    message   = "User " + user.name + " Add new Marital Status"

                  let category  = "Marital Status"
            
                  const log = this.logService.storeLog(user, category, message).toPromise()

                  log.then(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Marital Status Has Been Save')

                    // Refresh Datatables after Save Marital Status
                    $('#maritalstatusDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Marital Status
                    this.resetForm();
                  })
                })
  }

  public resetForm() {
    this.id.reset()
    this.updateBy.reset()
    this.marital_status_core_id.reset()
    this.name.reset()
  }

  get id(){
    return this.maritalstatusForm.get('id');
  }

  get updateBy(){
    return this.maritalstatusForm.get('updateBy');
  }

  get marital_status_core_id(){
    return this.maritalstatusForm.get('marital_status_core_id');
  }

  get name(){
    return this.maritalstatusForm.get('name');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#maritalstatusDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/marital-status',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'marital_status_core_id'
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
                    <button id="editMaritalStatus"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteMaritalStatus"
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
