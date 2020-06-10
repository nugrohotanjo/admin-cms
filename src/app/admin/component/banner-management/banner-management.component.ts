// Core
import { Component, OnInit, NgZone }                              from '@angular/core';
import { Router }                                                 from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';

// Service
import { BannerService }                                          from  './banner.service'

@Component({
  selector: 'app-banner-management',
  templateUrl: './pages/banner-management.component.html',
  styleUrls: ['./pages/banner-management.component.css']
})
export class BannerManagementComponent implements OnInit {

  dataUrl           : String  = environment.api_url
  prefix            : String  = environment.prefix
  image_url                   = environment.image_url

  constructor(  private router              : Router,
                private bannerService       : BannerService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private zone                : NgZone) { }

  ngOnInit() {
    this.loadScripts();
    let self = this;

    $(document).on('click', '#editBanner', function(){
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([ self.prefix +'/banner/edit/' + id]))
    });

    $(document).on('click', '#deleteBanner', function(){
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
            return   self.bannerService.destroyBanner(id)
                      .subscribe(() => {
                        $('#bannerDatatables').DataTable().ajax.reload();
                      });
            }
          })
    });
  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#bannerDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/banner',
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
              },{
                data : 'description'
              },{
                data : 'image',
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                  return "<img src='" + self.image_url + "" + data + "' class='img-dt gallery-item'/>";
                }
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editBanner"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteBanner"
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
