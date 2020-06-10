import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import {  FormGroup, 
          FormBuilder, 
          Validators } from '@angular/forms';
import { Router }                            from '@angular/router';

// Environtment
import { environment }              from 'src/environments/environment';

// Library
declare var $: any;
import Swal                                 from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService }       from '../../../../shared/service/dynamic-script.service';

// Service
import { ProductCategoryService }                from  './product-category.service';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  dataUrl           : String  = environment.api_url
  prefix            : String  = environment.prefix
  categoryForm      : FormGroup
  edited            : Boolean   = false

  constructor(  private fb                      : FormBuilder,
                private cd                       : ChangeDetectorRef,
                private productCategoryService  : ProductCategoryService,
                private dynamicScriptLoader     : DynamicScriptLoaderService,
                private sweetalertService       : SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts();

    let self = this;

    $(document).on('click', '#editCategory', function(){
      let id = $(this).data('id');
      return self.productCategoryService.getCategoryById(id)
                        .subscribe((data) => {
                          self.categoryForm.setValue({
                            id         : data.id,
                            name       : data.category_name
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteCategory', function(){
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
          return   self.productCategoryService.destroyCategory(id)
                    .subscribe(() => {
                      self.cd.detectChanges();
                      $('#categoryDatatables').DataTable().ajax.reload();
                    });
            }
        })
    });
  }

  public createCategory() {
    this.productCategoryService.saveCategory(this.categoryForm.value)
                      .subscribe(() => {
                        this.sweetalertService.yourWorkHasBeenSaved('Category Has Been Save')

                        // Refresh Datatables after Save Category
                        $('#categoryDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Save Category
                        this.resetForm();
                      });

  }

  private createForm(){
    this.categoryForm = this.fb.group({
      id                     : [''],
      name                     : ['', [Validators.required]]
    });
  }

  private initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#categoryDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl + '/list/category',
                'contentType' : 'application/json',
          		},
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'category_name'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editCategory"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteCategory"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
              }
          }]
      });

    });
  }

  public resetForm(){
    this.id.reset()
    this.name.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.categoryForm.get('id')
  }
  get name(){
    return this.categoryForm.get('name')
  }

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
     // Script Loaded Successfully
     this.initDataTables();
   }).catch(error => console.log(error));
  }


}
