// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { MenuService }                                            from './menu.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';

@Component({
  selector: 'app-menu-management',
  templateUrl: './pages/menu-management.component.html',
  styleUrls: ['./pages/menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  constructor(  private menuService         : MenuService,  
                private router              : Router,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone) 
  {

  }

  ngOnInit() 
  {
    this.loadScripts()
    let self = this;

    $(document).on('click', '#editMenu', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([ self.prefix +'/menu/edit/' + id]))
    });

    $(document).on('click', '#deleteMenu', function(){
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
          return   self.menuService.destroyMenu(id)
                    .subscribe(() => {
                      $('#menuDatatables').DataTable().ajax.reload();
                    });
          }
        })
    });
  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#menuDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/menu',
                'contentType' : 'application/json',
                beforeSend: function (xhr) {
                  xhr.setRequestHeader ("Authorization", "Bearer " + localStorage.getItem('SpecialToken'));
                }
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'name'
              }, {
                data : 'type'
              }, {
                data : 'link',
                width : '3%'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editMenu"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteMenu"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
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

}
