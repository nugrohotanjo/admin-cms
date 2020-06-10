import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Environtment
declare var $: any;
import Swal                          from 'sweetalert2/dist/sweetalert2.js';
import { environment }               from 'src/environments/environment';

import { ProductCategoryService }     from '../../../insurance/product/product-category/product-category.service'
import { DynamicScriptLoaderService } from '../../../../shared/service/dynamic-script.service';

// Model
import { ProductCategory }      from '../../../insurance/product/product-category/product-category'

// Shared Service
import { SweetalertService }    from '../../../../shared/service/sweetalert.service';
import { MasterFormulaService } from './master-formula.service'

@Component({
  selector: 'app-master-formula',
  templateUrl: './master-formula.component.html',
  styleUrls: ['./master-formula.component.css']
})
export class MasterFormulaComponent implements OnInit {

  formulaForm         : FormGroup
  dataUrl             : String = environment.api_url
  prefix              : String = environment.prefix
  ProductCategoryList : ProductCategory[];
  Formula                         = [];
  edited              : Boolean   = false

  constructor(  private fb                    : FormBuilder,
                private CategoryService       : ProductCategoryService,
                private masterFormulaService  : MasterFormulaService,
                private cd                    : ChangeDetectorRef,
                private dynamicScriptLoader   : DynamicScriptLoaderService,
                private sweetalertService     : SweetalertService ) 
                { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
    this.getAllCategory()
    this.initValue()
    let self = this;

    $(document).on('click', '#editFormula', function(){
      let id = $(this).data('id');
      return self.masterFormulaService.getFormulaById(id)
                        .subscribe((data) => {
                          self.formulaForm.setValue({
                            id              : data.id,
                            label           : data.formula,
                            product_type    : data.category_id.id,
                            age_basis       : data.age_basis
                          })

                          // Set Formula and Convert From String to Array
                          self.Formula = [...data.value.split(",")]

                          self.edited = true
                          self.cd.markForCheck()
                        })
    });

    $(document).on('click', '#deleteFormula', function(){
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
          return   self.masterFormulaService.destroyFormula(id)
                    .subscribe(() => {
                      // Reset Form after Save Health Product
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#formulaDatatables').DataTable().ajax.reload();
                    });
          }
      })
    });
  }

  public storeFormula() {
    this.masterFormulaService.saveFormula(this.formulaForm.value, this.Formula)
                    .subscribe(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Formula Has Been Save')

                      // Refresh Datatables after Save Formula
                      $('#formulaDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Formula
                      this.resetForm();
                    })
  }

  private initValue() {

  }

  public getAllCategory() {
    this.CategoryService.getAll()
                    .subscribe(data => this.ProductCategoryList = data);
  }

  public addFormula(param) {
    this.Formula.push(param)
  }

  public clearPreview() {
    this.Formula = []
  }

  private createForm(){
    this.formulaForm = this.fb.group({
      id                        : [''],
      label                     : ['', [Validators.required]],
      product_type              : ['', [Validators.required]],
      age_basis                 : ['', [Validators.required]],
    });
  }

  public resetForm(){
    this.id.reset()
    this.label.reset()
    this.product_type.reset()
    this.age_basis.reset()
    this.Formula = []

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get label(){
    return this.formulaForm.get('label')
  }
  get id(){
    return this.formulaForm.get('id')
  }
  get product_type(){
    return this.formulaForm.get('product_type')
  }
  get age_basis(){
    return this.formulaForm.get('age_basis')
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#formulaDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/formula',
                'contentType' : 'application/json',
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id',
                render: function (data, type, row, meta) {
                  return meta.row + meta.settings._iDisplayStart + 1;
                }
              }, {
                data : 'formula'
              }, {
                data : 'category_id.category_name',
                orderable: false,
                render: function (data, type, row) {
                    return `${data}`
                }
              }, {
                data : 'age_basis'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editFormula"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteFormula"
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
