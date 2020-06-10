// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';

// Environtment
import { environment }                                            from '../../../../environments/environment';

// Service
import { SinglePageService }                                      from './single-page.service';

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';

@Component({
  selector: 'app-single-page',
  templateUrl: './pages/single-page.component.html',
  styleUrls: ['./pages/single-page.component.css']
})
export class SinglePageComponent implements OnInit {

  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  constructor(  private singlePageService   : SinglePageService,  
                private router              : Router,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone) { }

  ngOnInit() {
    this.loadScripts();
    let self = this;

    $(document).on('click', '#editSinglePage', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([ self.prefix +'/single-page/edit/' + id]))
    });

    $(document).on('click', '#deleteSinglePage', function(){
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
            return   self.singlePageService.destroySinglePage(id)
                      .subscribe(() => {
                        $('#singlePageDatatables').DataTable().ajax.reload();
                      });
            }
          })
    });
  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#singlePageDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/single-page',
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
                data : 'slug'
              }, {
                data : 'status_publish',
                orderable: false,
                render: function (data, type, row) {
                  if(data === '0'){
                    return 'Not Active'
                  }else{
                    return 'Active'
                  }
                }
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editSinglePage"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteSinglePage"
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
