// Core
import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }                      from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';
import { CampaignSalesService }                                        from './campaign-sales.service';
import { CampaignService } from '../campaign-management/campaign.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../shared/service/sweetalert.service';

// Model
import { CampaignSales }                                                from './campaign-sales';
import { Campaign }                                               from '../campaign-management/campaign'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-campaign-management',
  templateUrl: './campaign-sales.component.html',
  styleUrls: ['./campaign-sales.component.css']
})
export class CampaignSalesManagementComponent implements OnInit {
  
  // en: any;
  campaigns                                                : Campaign;
  formCampaignSales                                       : FormGroup;
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix
  edited            : Boolean   = false
  table = null

  constructor( private fb                          : FormBuilder,
                private cd                          : ChangeDetectorRef,
                private campaignSalesService        : CampaignSalesService,
                private dynamicScriptLoader         : DynamicScriptLoaderService,
                private sweetalertService           : SweetalertService,
                private campaignService             : CampaignService) 
  {
    
  }

  ngOnInit() {
    this.loadScripts();
    this.createForm();
    this.initData();
    let self = this;

    $(document).on('click', '#editCampaignSales', function(){
      let id = $(this).data('id');
      self.campaignSalesService.getCampaignSalesById(id)
            .subscribe((data) => {
              
              self.formCampaignSales.setValue({
                id            : data.id,
                sales_name    : data.sales_name,
                promo_code    : data.promo_code,
                promotion     : data.promotion.id,
                description   : data.description,
                status        : data.status
              })

              self.edited = true
              self.cd.detectChanges();         
            })
    });

    $(document).on('click', '#deleteCampaignSales', function(){
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
              'Your Campaign has been deleted.',
              'success'
            )
          return   self.campaignSalesService.destroyCampaignSales(id)
                    .subscribe(() => {
                      $('#campaignSalesDatatables').DataTable().ajax.reload();
                    });
          }
        })
    });   
  }

  ngOnDestroy() {
    // this.table.draw()
  }

  public createCampaignSales(){
    this.campaignSalesService.saveCampaignSales(this.formCampaignSales.value)
                          .subscribe((data) => {
                            this.sweetalertService.yourWorkHasBeenSaved('Campaign Sales Has Been Save')
                            
                            // // Refresh Datatables after Save Campaign Sales
                            $('#campaignSalesDatatables').DataTable().ajax.reload();
                            
                            // // Reset Form after Save Campaign
                            this.resetForm();
                            
                          }, () => {
                              Swal.fire({ 
                                type: 'error', 
                                title: 'Oops...', 
                                text: 'Failed to save Campaign Sales!', 
                              }) // Swal
                            } // Error Message
                          ) // Subscribe
  }

  public createForm(){
    this.formCampaignSales = this.fb.group({
      id                        : [''],
      sales_name                : ['',[Validators.required]],
      promo_code                : ['',[Validators.required]],
      description               : ['',[Validators.required]],
      status                    : ['',[Validators.required]],
      promotion                 : ['',[Validators.required]]
    });
  }

  private initData() {
    this.campaignService.getAll().subscribe(data => this.campaigns = data )
  }

 public resetForm(){
  this.id.reset()
  this.sales_name.reset()
  this.promo_code.reset()
  this.description.reset()
  this.status.reset();
 }

  get id(){
    return this.formCampaignSales.get('id');
  }

  get promo_code(){
    return this.formCampaignSales.get('promo_code');
  }

  get sales_name(){
    return this.formCampaignSales.get('sales_name');
  }

  get description(){
    return this.formCampaignSales.get('description');
  }

  get status(){
    return this.formCampaignSales.get('status');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      self.table = $('#campaignSalesDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/promo-sales/list',
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
                data : 'sales_name'
              }, {
                data : 'promo_code'
              }, {
                data : 'promotion.promo_name'
              }, {
                data : 'status',
                render : function(data,type,row, meta) {
                  if(data == 1) {
                    return "Active"
                  } else {
                    return "In Active"
                  }
                }
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editCampaignSales"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteCampaignSales"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
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
