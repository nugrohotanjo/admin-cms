import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Environtment
declare var $: any;
import { environment }                                            from 'src/environments/environment';
import Swal                          from 'sweetalert2/dist/sweetalert2.js';

import { MasterSetupRateService }                                 from './master-setup-rate.service'
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { ProductCategoryService }                                 from '../../product/product-category/product-category.service'

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-master-setup-rate',
  templateUrl: './master-setup-rate.component.html',
  styleUrls: ['./master-setup-rate.component.css']
})
export class MasterSetupRateComponent implements OnInit {

  MasterSetupRate         : FormGroup
  dataUrl                 : String = environment.api_url
  prefix                  : String = environment.prefix
  selectedType            : String = null;
  ListCategory            : []
  edited                  : Boolean   = false
  
  constructor(private fb                      : FormBuilder,
              private masterSetupRateService  : MasterSetupRateService,
              private cd                      : ChangeDetectorRef,
              private productCategoryService  : ProductCategoryService,
              private dynamicScriptLoader     : DynamicScriptLoaderService,
              private sweetalertService       : SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    // Init Value
    this.loadValue()

    let self = this;
    $(document).on('click', '#editMasterRate', function(){
      let id = $(this).data('id');
      return self.masterSetupRateService.getRateSetupById(id)
                        .subscribe((data) => {
                          
                          self.changeParameterType(data.parameter_type)
                          self.MasterSetupRate.setValue({
                            id                : data.id,
                            product_category  : data.category_id.id,
                            name              : data.parameter_name,
                            type              : data.parameter_type,
                            value             : data.value
                          })

                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteMasterRate', function(){
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
          return   self.masterSetupRateService.destroyRateSetup(id)
                    .subscribe(() => {
                      // Reset Form after Save Health Product
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#masterSetupRateDatatables').DataTable().ajax.reload();
                    });
          }
      })
    });

  }

  private createForm(){
    this.MasterSetupRate = this.fb.group({
      id                          : [''],
      name                        : [''],
      type                        : [''],
      value                       : [''],
      product_category            : ['']
    });
  }

  public createSetupRate() {
    return this.masterSetupRateService.save(this.MasterSetupRate.value)
                    .subscribe(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Product Rate Has Been Save')

                       // Refresh Datatables after Save Health
                      $('#masterSetupRateDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Health
                      this.resetForm();
                    })
  }

  public changeParameterType(t){
    this.value.reset();
    this.selectedType = t;
  }

  private loadValue() {
    this.productCategoryService.getAll()
            .subscribe(data => this.ListCategory = data)
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#masterSetupRateDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/master-setup-rates',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'parameter_name'
              }, {
                data : 'category_id.category_name'
              }, {
                data : 'parameter_type'
              },{
                data : 'value'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editMasterRate"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteMasterRate"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
            }
          }]
      });

    });
  }

  get id(){
    return this.MasterSetupRate.get('id');
  }
  get name(){
    return this.MasterSetupRate.get('name');
  }
  get type(){
    return this.MasterSetupRate.get('type');
  }
  get value(){
    return this.MasterSetupRate.get('value');
  }
  get product_category(){
    return this.MasterSetupRate.get('product_category');
  }

  public resetForm(){
    this.id.reset()
    this.name.reset()
    this.type.reset()
    this.value.reset()
    this.product_category.reset()

    this.type.setValue('')

    this.selectedType = null

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables()
   }).catch(error => console.log(error));
  }

}
