import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';
import { Router }                                                 from '@angular/router';

// Service
import { ApiConsumerService } from './api-consumer.service'

declare var $: any;
import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-api-consumer',
  templateUrl: './api-consumer.component.html',
  styleUrls: ['./api-consumer.component.css']
})
export class ApiConsumerComponent implements OnInit {

  apiConsumerForm       : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                  : FormBuilder,
                private apiConsumerService        : ApiConsumerService,
                private cd                  : ChangeDetectorRef,
                private getCurrentUserService : GetCurrentUserService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,
                private zone                : NgZone,
                private router              : Router,
                private logService          : LogService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editApiConsumer', function(){
      let id = $(this).data('id');
      return self.apiConsumerService.getApiConsumerById(id)
                        .subscribe((data) => {
                          self.apiConsumerForm.setValue({
                            id              : data.id,
                            name            : data.name,
                            email           : data.email
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#viewApiConsumer', function() {
      let id = $(this).data('id');
      self.zone.run(() => self.router.navigate([self.prefix + '/api-consumer/detail/' + id]))
    })

    $(document).on('click', '#deleteApiConsumer', function(){
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
          return   self.apiConsumerService.destroyApiConsumer(id)
                    .subscribe(() => {
                      // Reset Form after Save api consumer
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#apiConsumerDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createApiConsumer(){
    let user = this.getCurrentUserService.getUserData()

    return this.apiConsumerService.saveApiConsumer(this.apiConsumerForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Api Consumer " + this.name.value
                    else 
                      message   = "User " + user.name + " Add new Api Consumer"

                    let category  = "ApiConsumer"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Api Consumer Has Been Save')

                      // Refresh Datatables after Save Api Consumer
                      $('#apiConsumerDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Api Consumer
                      this.resetForm();
                    })
                  })
  }

  private createForm(){
    this.apiConsumerForm = this.fb.group({
      id                        : [''],
      name                      : ['',[Validators.required]],
      email                     : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.name.reset()
    this.email.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.apiConsumerForm.get('id');
  }
  get name(){
    return this.apiConsumerForm.get('name');
  }
  get email(){
    return this.apiConsumerForm.get('email');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#apiConsumerDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/api-consumer',
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
                data : 'email'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="viewApiConsumer"
                            class="btn btn-icon icon-left btn-success"
                            data-id="${data.id}"><i class="far fa-eye"></i> View</button> 

                    <button id="editApiConsumer"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteApiConsumer"
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
