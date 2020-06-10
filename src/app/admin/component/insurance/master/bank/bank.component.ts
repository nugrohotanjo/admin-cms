import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service
import { BankService } from './bank.service'

declare var $: any;
import Swal from 'sweetalert2/dist/sweetalert2.js';

//shared service

import { SweetalertService } from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService } from '../../../../shared/service/getCurrentUser.service'
import { LogService } from '../../../../component/log-management/log.service'

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  bankForm: FormGroup
  dataUrl: String = environment.api_url
  prefix: String = environment.prefix

  edited: Boolean = false

  constructor(private fb: FormBuilder,
              private bankService: BankService,
              private getCurrentUserService: GetCurrentUserService,
              private cd: ChangeDetectorRef,
              private logService: LogService,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {

    this.createForm()
    this.loadScripts()
    let self = this;

            $(document).on('click', '#editBank', function () {
              let id = $(this).data('id');
              return self.bankService.getBankById(id)
                .subscribe((data) => {
                  self.bankForm.setValue({
                    id: data.id,
                    bank_code: data.bank_code,
                    name: data.name,
                  })
                  self.edited = true
                  self.cd.detectChanges();
                })
            });

            $(document).on('click', '#deleteBank', function () {
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
                  return self.bankService.destroyBank(id)
                    .subscribe(() => {
                      // Reset Form after Save Agent
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#bankDatatables').DataTable().ajax.reload();
                    });
                }
              })
            });
  }

  public createBank() {
    let user = this.getCurrentUserService.getUserData()

    this.bankForm.patchValue({
      update_by: user.name
    })

    return this.bankService.saveBank(this.bankForm.value)
      .subscribe(() => {
        // save log
        let user = this.getCurrentUserService.getUserData()

        let message = null // siapin variable message

        if (this.id.value)
          message = "User " + user.name + " Update Bank " + this.name.value
        else
          message = "User " + user.name + " Add new Bank"

        let category = "Bank"

        const log = this.logService.storeLog(user, category, message).toPromise()

        log.then(() => {
          this.sweetalertService.yourWorkHasBeenSaved('Bank Has Been Save')

          // Refresh Datatables after Save Agent
          $('#bankDatatables').DataTable().ajax.reload();

          // Reset Form after Save Agent
          this.resetForm();
        })
      })
  }

  private createForm() {
    this.bankForm = this.fb.group({
      id: [''],
      bank_code: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  public resetForm() {
    this.id.reset()
    this.bank_code.reset()
    this.name.reset()
   
    // back to normal button
    if (this.edited) {
      this.edited = false
    }
  }

  get id() {
    return this.bankForm.get('id');
  }
  get bank_code() {
    return this.bankForm.get('bank_code');
  }
  get name() {
    return this.bankForm.get('name');
  }

  public initDataTables() {
    let self = this;
    $(document).ready(function () {
      $('#bankDatatables').DataTable({
        ajax: {
          'type': 'GET',
          'url': self.dataUrl + '/bank/list',
          'contentType': 'application/json',
        },
        serverSide: true,
        responsive: true,
        order: [[ 0, "desc" ]],
        columns: [{
          data: 'id'
        }, {
          data: 'bank_code'
        }, {
          data: 'name'
        },{
          data: null,
          searchable: false,
          orderable: false,
          render: function (data, type, row) {
            return `
                      <button id="editBank"
                              class="btn btn-icon icon-left btn-info"
                              data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
        
                      <button id="deleteBank"
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
    this.dynamicScriptLoader.load('DataTables', 'DataTablesJpa').then(data => {
      // Script Loaded Successfully
       this.initDataTables()
    }).catch(error => console.log(error));
  }

}
