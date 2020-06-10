import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';

// Service
declare var $: any;
import { RenewRechargeService }                      from './renew-recharge.service'

import Swal                                     from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-renewal-recharge',
  templateUrl: './renewal-recharge.component.html',
  styleUrls: ['./renewal-recharge.component.css']
})
export class RenewalRechargeComponent implements OnInit {

  constructor(  private fb                  : FormBuilder,
                private renewRechargeService        : RenewRechargeService,
                private cd                  : ChangeDetectorRef,
                private getCurrentUserService : GetCurrentUserService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,
                private logService          : LogService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editRenewalRecharge', function(){
      let id = $(this).data('id');
      return self.renewRechargeService.getRenewRechargeById(id)
                        .subscribe((data) => {
                          self.renewalRechargeForm.setValue({
                            id              : data.id,
                            name            : data.name,
                            code            : data.code,
                            description     : data.description,
                            day             : data.day,
                            max_attempt     : data.max_attempt,

                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteRenewalRecharge', function(){
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
          return   self.renewRechargeService.destroyRenewRecharge(id)
                    .subscribe(() => {
                      // Reset Form after Save Renewal Recharge
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#renewalRechargeDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  //------------ START VARIABLE ---------------//
  renewalRechargeForm       : FormGroup
  dataUrl                   : String = environment.api_url
  prefix                    : String = environment.prefix

  edited    : Boolean   = false
  //------------ END VARIABLE ---------------//

  public createRenewalRecharge(){
    let user = this.getCurrentUserService.getUserData()

    this.renewalRechargeForm.patchValue({
      update_by : user.name
    })

    return this.renewRechargeService.saveRenewRecharge(this.renewalRechargeForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Renewal Recharge "
                    else 
                      message   = "User " + user.name + " Add new Renewal Recharge"

                    let category  = "Renewal Recharge"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Renewal Recharge Has Been Save')

                      // Refresh Datatables after Save Renewal Recharge
                      $('#renewalRechargeDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Renewal Recharge
                      this.resetForm();
                    })
                  })
  }

  private createForm(){
    this.renewalRechargeForm = this.fb.group({
      id                        : [''],
      name                      : ['',[Validators.required]],
      code                      : ['',[Validators.required]],
      description               : [''],
      day                       : ['',[Validators.required]],
      max_attempt               : ['',[Validators.required]],
    });
  }

  public resetForm(){
    this.id.reset()
    this.name.reset()
    this.code.reset()
    this.day.reset()
    this.max_attempt.reset()
    this.description.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.renewalRechargeForm.get('id');
  }
  get code (){
    return this.renewalRechargeForm.get('code');
  }
  get day(){
    return this.renewalRechargeForm.get('day');
  }
  get name(){
    return this.renewalRechargeForm.get('name');
  }
  get max_attempt(){
    return this.renewalRechargeForm.get('max_attempt');
  }
  get description(){
    return this.renewalRechargeForm.get('description');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#renewalRechargeDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/renew-recharge',
                'contentType' : 'application/json',
              },
        serverSide : true,
        responsive: true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'name'
              }, {
                data : 'day'
              }, {
                data : 'max_attempt'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editRenewalRecharge"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteRenewalRecharge"
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
