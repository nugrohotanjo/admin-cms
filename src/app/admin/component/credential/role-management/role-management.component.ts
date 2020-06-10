// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Title }                                                  from '@angular/platform-browser';
import { Router  }                                                from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { RoleService }                                            from './role.service';
import { GetCurrentUserService }                                  from '../../../shared/service/getCurrentUser.service'
import { LogService }                                             from '../../../component/log-management/log.service'
import { ListPermissionService }                                  from '../../../shared/service/permission.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../../shared/service/dynamic-script.service';
import { NgxPermissionsService }                                  from 'ngx-permissions';

// Model
import { Role }                                                   from './role';

@Component({
  selector: 'app-role-management',
  templateUrl: './pages/role-management.component.html',
  styleUrls: ['./pages/role-management.component.css'],
  providers: [RoleService,NgxPermissionsService]
})
export class RoleManagementComponent implements OnInit {

  roles             : Role[];
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix
  ListPermission    = null
  dtable_edit       = false
  dtable_delete     = false
  perm              = []

  constructor(private permissionsService            : NgxPermissionsService,
              private titleService                  : Title, 
              private roleService                   : RoleService,  
              private router                        : Router,
              private dynamicScriptLoader           : DynamicScriptLoaderService,
              private zone                          : NgZone,
              private getCurrentUserService         : GetCurrentUserService,
              private logService                    : LogService,
              private listPermissionService         : ListPermissionService) { }

  ngOnInit() {
    // Get Permission
    this.loadPermission()

    this.titleService.setTitle('Role Management');
    
    this.loadScripts();
    let self = this;

    $(document).on('click', '#editRole', function(){
        let id = $(this).data('id');
        self.zone.run(() => self.router.navigate([ self.prefix +'/roles/edit/' + id]))
    });

    $(document).on('click', '#deleteRole', function(){
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
            return   self.roleService.destroyRole(id)
                      .subscribe(() => {
                        $('#roleDatatables').DataTable().ajax.reload();

                        let user = self.getCurrentUserService.getUserData()
      
                          let message   = "User " + user.name + " Delete a Role"
                          let category  = "Role"
                    
                          self.logService.storeLog(user, category, message).toPromise()
                      });
            }
          })
    });
  }

  private initDataTables(){
    let self      = this;
    let edit_     = this.dtable_edit;
    let delete_   = this.dtable_delete;

    $(document).ready(function() {
      $('#roleDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/roles',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                render: function (data, type, row, meta) {
                  return meta.row + meta.settings._iDisplayStart + 1;
                }
              }, {
                data : 'name'
              }, {
                data : 'description'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                let edit     = "";
                let hapus    = "";

                if(edit_) {
                  edit = `<button id="editRole" class="btn btn-icon icon-left btn-info" data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> `;
                }

                if(delete_) {
                  hapus = `<button id="deleteRole"class="btn btn-icon icon-left btn-danger" data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>`
                }

                let html = edit + hapus

                return html;
            }
          }]
      });

    });
  }

  private loadPermission() {
    let u               = this.listPermissionService.getListPermission()
    this.ListPermission = u.permission_data
// console.log(this.ListPermission)

    // const perm = ["add-role"];

    // this.permissionsService.loadPermissions(["add-role"]);


    this.ListPermission.map(data => {

      if(data.slug == "delete-role") {
        this.dtable_delete = true
      }

      if(data.slug == "edit-role") {
        this.dtable_edit = true
      }

      // this.perm.push(data.slug); 
      
    })

    // this.permissionsService.loadPermissions(this.ListPermission);
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables();
   }).catch(error => console.log(error));
  }





}
