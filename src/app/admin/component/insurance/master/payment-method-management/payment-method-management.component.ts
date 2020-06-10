// Core
import { Component, OnInit, ChangeDetectorRef }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Servic
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { PaymentMethodSetupService }                              from './payment-method-setup.service'

// Library
declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';

// Environtment
import { environment }                                            from 'src/environments/environment';
@Component({
  selector: 'app-payment-method-management',
  templateUrl: './payment-method-management.component.html',
  styleUrls: ['./payment-method-management.component.css']
})
export class PaymentMethodManagementComponent implements OnInit {

  PaymentMethod               : FormGroup
  dataUrl                     : String = environment.api_url
  prefix                      : String = environment.prefix
  edited                      : Boolean   = false

  constructor(  private fb                                : FormBuilder,
                private paymentMethodSetupService         : PaymentMethodSetupService,
                private cd                                : ChangeDetectorRef,
                private dynamicScriptLoader               : DynamicScriptLoaderService,
                private sweetalertService                 : SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editPaymentMethod', function(){
      let id = $(this).data('id');
      return self.paymentMethodSetupService.getPaymentMethodById(id)
                        .subscribe((data) => {
                          self.PaymentMethod.setValue({
                            id              : data.id,
                            method_name     : data.method_name,
                            method_type     : data.method_type,
                          })

                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deletePaymentMethod', function(){
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
          return   self.paymentMethodSetupService.destroyPaymentMethod(id)
                    .subscribe(() => {
                      // Reset Form after Save Payment Method
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#paymentMethodDatatables').DataTable().ajax.reload();
                    });
          }
      })
    });
  }

  public createPaymentMethod(){
    return this.paymentMethodSetupService.savePaymentMethodSetup(this.PaymentMethod.value)
                    .subscribe(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Payment Method Product Rate Has Been Save')

                        // Refresh Datatables after Save Payment Method
                      $('#paymentMethodDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Payment Method
                      this.resetForm();
                    })
  }

  private createForm(){
    this.PaymentMethod = this.fb.group({
      id                : [''],
      method_name       : ['',[Validators.required]],
      method_type       : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.method_name.reset()
    this.method_type.reset()

    this.method_type.setValue('')

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.PaymentMethod.get('id');
  }
  get method_name(){
    return this.PaymentMethod.get('method_name');
  }
  get method_type(){
    return this.PaymentMethod.get('method_type');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#paymentMethodDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/payment-method-setup',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'method_name'
              }, {
                data : 'method_type'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editPaymentMethod"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deletePaymentMethod"
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
