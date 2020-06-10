// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';
import { EventService }                                           from './event.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './pages/event-management.component.html',
  styleUrls: ['./pages/event-management.component.css']
})
export class EventManagementComponent implements OnInit {

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  constructor(  private router              : Router,
                private eventService        : EventService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone
              ) 
  { }

  ngOnInit() {
    this.loadScripts();
    let self = this;

    $(document).on('click', '#editEvent', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([ self.prefix +'/event/edit/' + id]))
    });

    $(document).on('click', '#deleteEvent', function(){
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
            return   self.eventService.destroyEvent(id)
                      .subscribe(() => {
                        $('#eventDatatables').DataTable().ajax.reload();
                      });
            }
          })
    });
  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#eventDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/event',
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
                data : 'title'
              }, {
                data : 'category',
                orderable: false,
                render: function (data, type, row) {
                  return `${data}`;
                }
              }, {
                data : 'user_id.name',
                orderable: false,
                render: function (data, type, row) {
                  return `${data}`;
                }
              }, {
                data : 'createdAt'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editEvent"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteEvent"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
            }
          }],
          initComplete: function(setting){
            var api = new $.fn.dataTable.Api(setting);
            $('.table-filter-container', api.table().container()).append(
              $('#table-filter').detach().show()
            );
          }
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
