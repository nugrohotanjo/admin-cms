import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { Router }                                                 from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-job-class-mapping',
  templateUrl: './job-class-mapping.component.html',
  styleUrls: ['./job-class-mapping.component.css']
})
export class JobClassMappingComponent implements OnInit {

  constructor(private dynamicScriptLoader               : DynamicScriptLoaderService,
              private zone                              : NgZone,
              private cd                                : ChangeDetectorRef,
              private router                            : Router,
              ) { }

  ngOnInit() {
    this.loadScripts()
    let self = this;

    $(document).on('click', '#mappingJobClassProduct', function(){
      let id        = $(this).data('id');
      
      self.zone.run(() => self.router.navigate([ self.prefix +'/job-class-mapping/detail/' + id ]))
    });
  }

  //----------------- SET VARIABLE START -----------------//
  dataUrl                     : String = environment.api_url
  prefix                      : String = environment.prefix
  //----------------- SET VARIABLE END -----------------//

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
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id',
              },{
                data : 'name',
                render : function(data) {
                  if(data === " " || data === "" || data === undefined || data === null)
                    return "Rider"
                  else 
                    return data
                }
              }
              ,{
                data : 'product_name',
              },{
                data : 'product_type',
              },{
                data : 'category_product.category_name',
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
                    <button id="mappingJobClassProduct"
                            class="btn btn-icon icon-left btn-primary btn-sm"
                            data-id="${data.id}"><i class="fas fa-map-pin"></i> Mapping</button> 
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
