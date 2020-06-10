import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

import { DynamicScriptLoaderService }                            from 'src/app/admin/shared/service/dynamic-script.service';
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { PermissionManagementService } from './permission-management.service'
import { GetCurrentUserService }                                from '../../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../../component/log-management/log.service'

// Environtment
declare var $: any;
import { SweetalertService }                                      from 'src/app/admin/shared/service/sweetalert.service';
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.css']
})
export class PermissionManagementComponent implements OnInit {

  constructor(  private dynamicScriptLoader           :  DynamicScriptLoaderService,
                private fb                            : FormBuilder,
                private getCurrentUserService         : GetCurrentUserService,
                private permissionManagementService   : PermissionManagementService,
                private logService                    : LogService,
                private sweetalertService             : SweetalertService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editPermission', function(){
      let id = $(this).data('id');
      return self.permissionManagementService.getPermissionById(id)
                        .subscribe((data) => {
                          self.permissionForm.setValue({
                            id              : data.id,
                            permission_name : data.permission_name,
                            description     : data.description,
                            slug            : data.slug
                          })
                          self.edited = true
                        })
    });

    $(document).on('click', '#deletePermission', function(){
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
          return   self.permissionManagementService.destroyPermission(id)
                    .subscribe(() => {
                      // Reset Form after delete Permission
                      self.resetForm();
                      $('#permissionDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  /** Variable Start */
  permissionForm          : FormGroup
  dataUrl                 : String = environment.api_url
  prefix                  : String = environment.prefix
  edited                  : Boolean   = false
  /** Variable End */

  private createForm(){
    this.permissionForm = this.fb.group({
      id                        : [''],
      permission_name           : ['',[Validators.required]],
      slug                      : [''],
      description               : ['',[Validators.required]]
    });
  }

  public createPermission() {
    return this.permissionManagementService.savePermission(this.permissionForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Permission " + this.permission_name.value
                    else 
                      message   = "User " + user.name + " Add new Permission"

                    let category  = "Permission"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Permission Has Been Save')

                      // Refresh Datatables after Save Permission
                      $('#permissionDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Permission
                      this.resetForm();
                    })
                  })
  }

  public resetForm(){
    this.id.reset()
    this.permission_name.reset()
    this.slug.reset()
    this.description.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id() {
    return this.permissionForm.get('id');
  }
  get slug(){
    return this.permissionForm.get('slug');
  }
  get permission_name(){
    return this.permissionForm.get('permission_name');
  }
  get description(){
    return this.permissionForm.get('description');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#permissionDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/permission',
                'contentType' : 'application/json',
              },
        serverSide : true,
        responsive: true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'permission_name'
              }, {
                data : 'description'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editPermission"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deletePermission"
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
