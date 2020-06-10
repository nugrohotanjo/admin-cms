import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { CurrencyService }                                        from './currency.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
  providers: [CurrencyService]
})
export class CurrencyComponent implements OnInit {

  currencyForm      : FormGroup
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  edited            : Boolean   = false

  constructor(private fb                  : FormBuilder,
              private dynamicScriptLoader : DynamicScriptLoaderService,
              private cd                  : ChangeDetectorRef,
              private currencyService     : CurrencyService,
              private sweetalertService   : SweetalertService,) { }

  ngOnInit( ) {
    this.loadForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editCurrency', function(){
      let id = $(this).data('id');
      return self.currencyService.getCurrencyById(id)
                        .subscribe((data) => {
                          self.currencyForm.setValue({
                            id              : data.id,
                            code            : data.code,
                            core_id         : data.core_id,
                            name            : data.name,
                            pattern         : data.pattern
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteCurrency', function(){
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
          return   self.currencyService.destroyCurrency(id)
                    .subscribe(() => {
                      // Reset Form after Save Benefit
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#currencyDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  private loadForm() {
    this.currencyForm = this.fb.group({
      id                : [''],
      code              : ['',[Validators.required]],
      core_id           : ['',[Validators.required]],
      name              : ['',[Validators.required]],
      pattern           : ['',[Validators.required]]
    })
  }

  public createCurrency() {
    this.currencyService.saveCurrency(this.currencyForm.value)
                .subscribe((data) => {
                  this.sweetalertService.yourWorkHasBeenSaved('Currency Has Been Save')

                  // Refresh Datatables after Save Currency
                  $('#currencyDatatables').DataTable().ajax.reload();
                            
                  // Reset Form after Save Currency
                  this.resetForm();
                })
  }

  public resetForm() {
    this.id.reset()
    this.code.reset()
    this.core_id.reset()
    this.name.reset()
    this.pattern.reset()
  }

  get id(){
    return this.currencyForm.get('id');
  }

  get code(){
    return this.currencyForm.get('code');
  }

  get core_id(){
    return this.currencyForm.get('core_id');
  }

  get name(){
    return this.currencyForm.get('name');
  }

  get pattern(){
    return this.currencyForm.get('pattern');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#currencyDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/currencies',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'code'
              }, {
                data : 'core_id'
              },{
                data : 'name'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editCurrency"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteCurrency"
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
