import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                     from '@angular/forms';

// Service
import { DynamicScriptLoaderService }                             from '../../../../shared/service/dynamic-script.service';
import { JobClassService }                                        from './job-class.service'
import { GetCurrentUserService }                                  from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                             from '../../../../component/log-management/log.service'
import { SweetalertService }                                      from 'src/app/admin/shared/service/sweetalert.service';

import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-job-class',
  templateUrl: './job-class.component.html',
  styleUrls: ['./job-class.component.css']
})
export class JobClassComponent implements OnInit {

  constructor(private dynamicScriptLoader         : DynamicScriptLoaderService,
              private fb                          : FormBuilder,
              private jobClassService             : JobClassService,
              private logService                  : LogService,
              private getCurrentUserService       : GetCurrentUserService,
              private sweetalertService           : SweetalertService,
              private cd                          : ChangeDetectorRef,) { }

  ngOnInit() {
    this.loadForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editJob', function(){
      let id = $(this).data('id');
      return self.jobClassService.getJobClassById(id)
                        .subscribe((data) => {
                          self.jobForm.setValue({
                            id              : data.id,
                            job_code       : data.job_code,
                            job_name            : data.job_name
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteJob', function(){
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
          return   self.jobClassService.destroyJobClass(id)
                    .subscribe(() => {
                      // save log
                      let user = self.getCurrentUserService.getUserData()
        
                      let message = "User " + user.name + " Delete Job Class" + self.job_name.value

                      let category  = "Job_Class"
                
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {
                        self.sweetalertService.yourWorkHasBeenSaved('Job class Has Been Delete')

                        // Refresh Datatables after Save Job Class
                        $('#jobClassDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Delete Job Class
                        self.resetForm();
                      })
                    });
            }
          })
    });



  }

  //---------------------- START ----------------------//
  dataUrl           : String    = environment.api_url
  prefix            : String    = environment.prefix
  jobForm           : FormGroup
  edited            : Boolean   = false
  //---------------------- END ----------------------//

  public createJobClass() {
    let user = this.getCurrentUserService.getUserData()

    this.jobClassService.saveJobClass(this.jobForm.value)
                .subscribe((data) => {
                  // save log
                  let user = this.getCurrentUserService.getUserData()
      
                  let message = null // siapin variable message

                  if(this.id.value)
                    message   = "User " + user.name + " Update Job Class " + this.job_name.value
                  else 
                    message   = "User " + user.name + " Add new Job Class"

                  let category  = "Job_Class"
            
                  const log = this.logService.storeLog(user, category, message).toPromise()

                  log.then(() => {
                    this.sweetalertService.yourWorkHasBeenSaved('Job class Has Been Save')

                    // Refresh Datatables after Save JobClass
                    $('#jobClassDatatables').DataTable().ajax.reload();
                            
                    // Reset Form after Save JobClass
                    this.resetForm();
                  })
                })
  }

  private loadForm() {
    this.jobForm = this.fb.group({
      id                : [''],
      job_name          : ['',[Validators.required]],
      job_code          : ['',[Validators.required]]
    })
  }

  public resetForm() {
    this.id.reset()
    this.job_name.reset()
    this.job_code.reset()
  }

  get id(){
    return this.jobForm.get('id');
  }
  get job_name(){
    return this.jobForm.get('job_name');
  }
  get job_code(){
    return this.jobForm.get('job_code');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#jobClassDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/job-class',
                'contentType' : 'application/json',
              },
        serverSide : true,
        responsive: true,
        order: [[ 0, "desc" ]],
        columns : [{
                data : 'id'
              }, {
                data : 'job_code'
              }, {
                data : 'job_name'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data) {
                return `
                    <button id="editJob"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteJob"
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
