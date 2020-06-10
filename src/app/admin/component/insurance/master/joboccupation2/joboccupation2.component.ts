import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { JobOccupation2Service } from './joboccupation2.service'

import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

// Shared Service
import { SweetalertService }                                    from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                           from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                           from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-joboccupation2',
  templateUrl: './joboccupation2.component.html',
  styleUrls: ['./joboccupation2.component.css']
})
export class Joboccupation2Component implements OnInit {

  joboccupation2Form : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  edited            : Boolean   = false

  constructor(private jobOccupation2Service : JobOccupation2Service,
              private fb                          : FormBuilder,
              private cd                          : ChangeDetectorRef,
              private getCurrentUserService       : GetCurrentUserService,
              private dynamicScriptLoader         : DynamicScriptLoaderService,
              private sweetalertService           : SweetalertService,
              private logService                  : LogService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
    
    let self = this;
    $(document).on('click', '#editJobOccupation2', function(){
      let id = $(this).data('id');
      return self.jobOccupation2Service.getJobOccupation2ById(id)
                        .subscribe((data) => {
                          self.joboccupation2Form.setValue({
                            id              : data.id,
                            job_code        : data.job_code,
                            description     : data.description
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteJobOccupation2', function(){
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
          return   self.jobOccupation2Service.destroyJobOccupation2(id)
                    .subscribe(() => {

                      // save log
                      let user = self.getCurrentUserService.getUserData()
                      
                      let message = "User " + user.name + " Delete Job Occupation 2" + self.job_code.value

                      let category  = "Job Occupation 2"
                
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {

                        // Refresh Datatables after Save Job Occupation 2
                        $('#joboccupation2Datatables').DataTable().ajax.reload();
                                
                        // Reset Form after Delete Job Occupation 2
                        self.resetForm();
                      })
                    });
            }
          })
    });
  }

  private createForm(){
    this.joboccupation2Form = this.fb.group({
      id                        : [''],
      job_code                  : ['',[Validators.required]],
      description               : ['',[Validators.required]]
    });
  }

  public resetForm(){
    this.id.reset()
    this.job_code.reset()
    this.description.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  public createJobOccupation2(){
    let user = this.getCurrentUserService.getUserData()

    this.joboccupation2Form.patchValue({
      update_by : user.name
    })

    return this.jobOccupation2Service.saveJobOccupation2(this.joboccupation2Form.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Job Occupation 2 " + this.job_code.value
                    else 
                      message   = "User " + user.name + " Add new Job Occupation 2"

                    let category  = "Job Occupation 2"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Job Occupation 2 Has Been Save')

                      // Refresh Datatables after Save Job Occupation 2
                      $('#joboccupation2Datatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Job Occupation 2
                      this.resetForm();
                    })
                  })
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#joboccupation2Datatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/jobs-occupation2',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'job_code'
              }, {
                data : 'description'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editJobOccupation2"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteJobOccupation2"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
            }
          }]
      });
    });
  }

  get id(){
    return this.joboccupation2Form.get('id');
  }
  get job_code(){
    return this.joboccupation2Form.get('job_code');
  }
  get description(){
    return this.joboccupation2Form.get('description');
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables','DataTablesJpa').then(data => {
      // Script Loaded Successfully
      this.initDataTables()
    }).catch(error => console.log(error));
  }

}
