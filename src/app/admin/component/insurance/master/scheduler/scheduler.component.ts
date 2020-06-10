import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }  from '@angular/forms';

// Service
declare var $: any;
import { SchedulerService }                      from './scheduler.service'

import Swal                                     from 'sweetalert2/dist/sweetalert2.js';

// Shared Service
import { SweetalertService }                                      from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                            from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                         from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  schedulerForm      : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited    : Boolean   = false

  constructor(  private fb                  : FormBuilder,
                private schedulerService        : SchedulerService,
                private cd                  : ChangeDetectorRef,
                private getCurrentUserService : GetCurrentUserService,
                private dynamicScriptLoader : DynamicScriptLoaderService,
                private sweetalertService   : SweetalertService,
                private logService          : LogService ) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
  
    let self = this;

    $(document).on('click', '#editScheduler', function(){
      let id = $(this).data('id');
      return self.schedulerService.getSchedulerById(id)
                        .subscribe((data) => {
                          self.schedulerForm.setValue({
                            id              : data.id,
                            name            : data.name,
                            code            : data.code,
                            description     : data.description,
                            hour            : data.hour,
                            minute          : data.minute,

                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteScheduler', function(){
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
          return   self.schedulerService.destroyScheduler(id)
                    .subscribe(() => {
                      // Reset Form after Save Scheduler
                      self.resetForm();

                      self.cd.detectChanges();
                      $('#schedulerDatatables').DataTable().ajax.reload();
                    });
            }
          })
    });
  }

  public createScheduler(){
    let user = this.getCurrentUserService.getUserData()

    this.schedulerForm.patchValue({
      update_by : user.name
    })

    return this.schedulerService.saveScheduler(this.schedulerForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Scheduler "
                    else 
                      message   = "User " + user.name + " Add new Scheduler"

                    let category  = "Scheduler"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Scheduler Has Been Save')

                      // Refresh Datatables after Save Scheduler Time
                      $('#schedulerDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Scheduler Time
                      this.resetForm();
                    })
                  })
  }

  private createForm(){
    this.schedulerForm = this.fb.group({
      id                        : [''],
      name                      : ['',[Validators.required]],
      code                      : ['',[Validators.required]],
      description               : [''],
      hour                      : ['',[Validators.required]],
      minute                    : ['',[Validators.required]],
    });
  }

  public resetForm(){
    this.id.reset()
    this.name.reset()
    this.hour.reset()
    this.code.reset()
    this.minute.reset()
    this.description.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.schedulerForm.get('id');
  }
  get code (){
    return this.schedulerForm.get('code');
  }
  get hour (){
    return this.schedulerForm.get('hour');
  }
  get minute(){
    return this.schedulerForm.get('minute');
  }
  get name(){
    return this.schedulerForm.get('name');
  }
  get description(){
    return this.schedulerForm.get('description');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#schedulerDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/scheduler-time',
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
                data : 'hour'
              }, {
                data : 'minute'
              }, {
                data : 'description'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editScheduler"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteScheduler"
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
