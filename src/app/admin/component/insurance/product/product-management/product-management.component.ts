// Core
import { Component, OnInit, OnDestroy, NgZone, Renderer2, ChangeDetectorRef }                              from '@angular/core';
import { Router  }                                                from '@angular/router';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { ProductCategoryService }                                 from '../../product/product-category/product-category.service'
import { ProductManagementService } from './product-management.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit, OnDestroy {

  dataUrl                     : String = environment.api_url
  prefix                      : String = environment.prefix

  table = null
  listCategory : any = []

  constructor(  private dynamicScriptLoader               : DynamicScriptLoaderService,
                private sweetalertService                 : SweetalertService,
                private productCategoryService            : ProductCategoryService,
                private router                            : Router,
                private cd                                : ChangeDetectorRef,
                private productManagementService          : ProductManagementService,
                private zone                              : NgZone) { }

  ngOnInit() {
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editProduct', function(){
      let id        = $(this).data('id');
      let type      = $(this).data('type');
      let category  = $(this).data('category');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/product/add/category/' + type + '/' + category + '/' + id]))
    });

    $(document).on('click', '#viewProduct', function(){
      let id        = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/product-approval/detail/' + id]))
    });

    $(document).on('click', '#archived', function(){
      let id = $(this).data('id');
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Archived it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Archived!',
              'Your Product has been archived.',
              'success'
            )
          return   self.productManagementService.archivedProduct(id)
                    .subscribe(() => {
                      $('#productDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });

    this.initData()

    
  }

  ngOnDestroy() {
    this.table.draw()
  }

  private initData() {
    let category = this.productCategoryService.getAll().toPromise()

    category.then((data) => {
      this.listCategory = data
    })
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      self.table = $('#productDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/product/0',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                width : '1%'
              },{
                data : 'name',
                width : '1%',
                render : function(data) {
                  if(data === " " || data === "" || data === undefined || data === null)
                    return "Rider"
                  else 
                    return data
                }
              }
              ,{
                width : '1%',
                data : 'product_name',
                
              },{
                data : 'product_type',
                width : '1%'
              },{
                width : '1%',
                data : 'category_product.category_name',
                render : function(data) {
                  if(data != undefined)
                    return data 
                  else 
                    return ""
                }
              },{
                data : 'product_status',
                width : '1%',
                searchable: true,
                render : function(data) {
                  if(data != 1)
                    return 'Not Approved' 
                  else 
                    return 'Approved'
                }
              },{
                width : '5%',
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="viewProduct"
                            class="btn btn-icon icon-left btn-primary btn-sm"
                            data-id="${data.id}" data-type="${data.product_type}" data-category="${data.category_product.id}"><i class="fas fa-eye"></i> View</button> 


                    <button id="editProduct"
                            class="btn btn-icon icon-left btn-info btn-sm"
                            data-id="${data.id}" data-type="${data.product_type}" data-category="${data.category_product.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="archived"
                            class="btn btn-icon icon-left btn-danger btn-sm"
                            data-id="${data.id}"><i class="fas fa-times"></i> Archived</button>
                `;
            }
          }]
      ,
      
      initComplete: function() {

        var da = this.api();
        // filter status approved / not approved
        $('#filter_status').on('change', function() {
          var val = $(this).val();
          da.column(5).search(val).draw()
        });

        // Filter Product Type
        $('#filter_type').on('change', function() {
          var val = $(this).val();
          da.column(3).search(val).draw()
        });

        // Filter Product Category
        $('#filter_category').on('change', function() {
          var val = $(this).val();
          da.column(4).search(val).draw()
        });

      }


      }); // end datatables

    }); // end jquery dom
  }



  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
      // Script Loaded Successfully
      this.initDataTables()

    }).catch(error => console.log(error));
  }
  

}
