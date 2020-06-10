// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';
import { Title }                                                  from '@angular/platform-browser';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { DynamicScriptLoaderService }                             from '../../../shared/service/dynamic-script.service';
import { UserService }                                            from './user.service'
import { ListPermissionService }                                  from '../../../shared/service/permission.service'

// Model
import { User }                                                   from './user';

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-user-management',
  templateUrl: './pages/user-management.component.html',
  styleUrls: ['./pages/user-management.component.css'],
  providers: [UserService]
})
export class UserManagementComponent implements OnInit {
  
  users       : User[];
  dataUrl       : String = environment.api_url
  prefix        : String = environment.prefix
  ListPermission    = null
  dtable_edit       = false
  dtable_delete     = false

  constructor(  
                private titleService        : Title, 
                private userService         : UserService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone,
                private router              : Router,
                private listPermissionService         : ListPermissionService) 
  {}

  ngOnInit() {  
    // Get Permission
    this.loadPermission()


    this.titleService.setTitle('User Management');

    this.loadScripts();
    let self = this;

    $(document).on('click', '#editUser', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([self.prefix + '/users/edit/' + id]))
    });

    $(document).on('click', '#deleteUser', function(){
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
          return   self.userService.destroyUser(id)
                    .subscribe(() => {
                      $('#UserDatatables').DataTable().ajax.reload();
                    });
          }
        })
    });

  }

  private initDataTables(){
    let self = this;
    let edit_     = this.dtable_edit;
    let delete_   = this.dtable_delete;

    $(document).ready(function() {
      $('#UserDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/users',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                width: '5%',
                data : 'id',
                render: function (data, type, row, meta) {
                  return meta.row + meta.settings._iDisplayStart + 1;
                }
              }, {
                width: '20%',
                data : 'name'
              }, {
                width: '20%',
                data : 'email'
              }, {
                width: '20%',
                data : 'role_id.name',
                orderable: false,
                render: function (data, type, row) {
                    return `${data}`
                }
              },{
                width: '20%',
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {

                  let edit     = "";
                  let hapus    = "";
  
                  if(edit_) {
                    edit = `<button id="editUser" class="btn btn-icon icon-left btn-info" data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> `;
                  }
  
                  if(delete_) {
                    hapus = `<button id="deleteUser"class="btn btn-icon icon-left btn-danger" data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>`
                  }
  
                  let html = edit + hapus
  
                  return html;
            }
          }]
      });

    });
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables();
   }).catch(error => console.log(error));
 }

 private loadPermission() {
  let u               = this.listPermissionService.getListPermission()
  this.ListPermission = u.permission_data

  this.ListPermission.map(data => {

    if(data.slug == "delete-user") {
      this.dtable_delete = true
    }

    if(data.slug == "edit-user") {
      this.dtable_edit = true
    }
    
  })
}

}
