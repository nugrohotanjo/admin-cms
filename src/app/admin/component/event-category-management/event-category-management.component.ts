import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';

// Service
import { EventCategoryService }                                   from './event-category.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-event-category-management',
  templateUrl: './pages/event-category-management.component.html',
  styleUrls: ['./pages/event-category-management.component.css']
})
export class EventCategoryManagementComponent implements OnInit {

  dataUrl : String = environment.api_url
  prefix  : String = environment.prefix

  constructor(  private dynamicScriptLoader           : DynamicScriptLoaderService,
                private eventCategoryService          : EventCategoryService,
                private zone                          : NgZone,
                private router                        : Router,) { }

  ngOnInit() {
    this.loadScripts();
    let self = this;

    $(document).on('click', '#editEventCategory', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([self.prefix + '/event/category/edit/' + id]))
    });

    $(document).on('click', '#deleteEventCategory', function(){
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
            return   self.eventCategoryService.destroyCategoryEvent(id)
                      .subscribe(() => {
                        $('#eventCategoryDatatables').DataTable().ajax.reload();
                      });
            }
          })
    });
  }

  private initDataTables(){
    let self = this;

    $(document).ready(function() {
      $('#eventCategoryDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/event/category',
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
                data : 'description'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editEventCategory"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteEventCategory"
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
