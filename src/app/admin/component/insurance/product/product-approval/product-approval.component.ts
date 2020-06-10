import { Component, OnInit, NgZone } from '@angular/core';
import { Router  }                                                from '@angular/router';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-product-approval',
  templateUrl: './product-approval.component.html',
  styleUrls: ['./product-approval.component.css']
})
export class ProductApprovalComponent implements OnInit {

  dataUrl                     : String = environment.api_url
  prefix                      : String = environment.prefix

  constructor(  private dynamicScriptLoader               : DynamicScriptLoaderService,
                private sweetalertService                 : SweetalertService,
                private router                            : Router,
                private zone                              : NgZone) { }

  ngOnInit() {
    this.loadScripts()

    let self = this;

    $(document).on('click', '#view', function(){
      let id        = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/product-approval/detail/' + id]))
    });

  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#productDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/product/0',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                width : '10%'
              },{
                data : 'name',
                width : '20%',
                render : function(data) {
                  if(data === "")
                    return "Rider"
                  else 
                    return data
                }
              }
              ,{
                data : 'product_name',
                width : '20%'
              },{
                data : 'product_type',
                width : '10%'
              },{
                data : 'category_product.category_name',
                width : '10%',
                render : function(data) {
                  if(data != undefined)
                    return data 
                  else 
                    return ""
                }

              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="view"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> View</button> 
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
