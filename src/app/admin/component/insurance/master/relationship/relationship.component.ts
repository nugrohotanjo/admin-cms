import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { RelationshipService }                                        from './relationship.service'
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
  selector: 'app-relationship',
  templateUrl: './relationship.component.html',
  styleUrls: ['./relationship.component.css']
})
export class RelationshipComponent implements OnInit {

  relationshipForm      : FormGroup
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  edited            : Boolean   = false

  constructor(private fb                          : FormBuilder,
              private dynamicScriptLoader         : DynamicScriptLoaderService,
              private cd                          : ChangeDetectorRef,
              private relationshipService         : RelationshipService,
              private logService                  : LogService,
              private getCurrentUserService       : GetCurrentUserService,
              private sweetalertService           : SweetalertService,) { }

  ngOnInit( ) {
    this.loadForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editRelationship', function(){
      let id = $(this).data('id');
      return self.relationshipService.getRelationshipById(id)
                        .subscribe((data) => {
                          self.relationshipForm.setValue({
                            id              : data.id,
                            updateBy        : data.updateBy,
                            relation_code   : data.relation_code,
                            relation_name   : data.relation_name
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteRelationship', function(){
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
          return   self.relationshipService.destroyRelationship(id)
                    .subscribe(() => {
                      // save log
                      let user = self.getCurrentUserService.getUserData()
        
                      let message = "User " + user.name + " Delete Relationship" + self.relation_name.value

                      let category  = "Relationship"
                
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {
                        self.sweetalertService.yourWorkHasBeenSaved('Relationship Has Been Delete')

                        // Refresh Datatables after Save Relationship
                        $('#relationshipDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Delete Relationship
                        self.resetForm();
                      })
                    });
            }
          })
    });
  }

  private loadForm() {
    this.relationshipForm = this.fb.group({
      id                : [''],
      updateBy          : [''],
      relation_code     : ['',[Validators.required]],
      relation_name     : ['',[Validators.required]]
    })
  }

  public createRelationship() {
    let user = this.getCurrentUserService.getUserData()

    this.relationshipForm.patchValue({
      updateBy : user.name
    })

    this.relationshipService.saveRelationship(this.relationshipForm.value)
                .subscribe((data) => {
                  // save log
                  let user = this.getCurrentUserService.getUserData()
      
                  let message = null // siapin variable message

                  if(this.id.value)
                    message   = "User " + user.name + " Update Relationship " + this.relation_name.value
                  else 
                    message   = "User " + user.name + " Add new Relationship"

                  let category  = "Relationship"
            
                  const log = this.logService.storeLog(user, category, message).toPromise()

                  log.then(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Relationship Has Been Save')

                    // Refresh Datatables after Save Relationship
                    $('#relationshipDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save Relationship
                    this.resetForm();
                  })
                })
  }

  public resetForm() {
    this.id.reset()
    this.updateBy.reset()
    this.relation_code.reset()
    this.relation_name.reset()
  }

  get id(){
    return this.relationshipForm.get('id');
  }

  get updateBy(){
    return this.relationshipForm.get('updateBy');
  }

  get relation_code(){
    return this.relationshipForm.get('relation_code');
  }

  get relation_name(){
    return this.relationshipForm.get('relation_name');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#relationshipDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/customers-relation',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'relation_code'
              }, {
                data : 'relation_name'
              },{
                data : 'updateBy'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editRelationship"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteRelationship"
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
