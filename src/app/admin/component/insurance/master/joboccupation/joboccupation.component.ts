import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                    from '@angular/forms';

// Service
import { JobOccupationService } from './joboccupation.service'

import Swal                                                       from 'sweetalert2/dist/sweetalert2.js';
import * as XLSX from 'xlsx';
declare var $: any;

// Shared Service
import { SweetalertService }                                    from '../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                           from '../../../../shared/service/dynamic-script.service';
import { GetCurrentUserService }                                from '../../../../shared/service/getCurrentUser.service'
import { LogService }                                           from '../../../../component/log-management/log.service'

// Environtment
import { environment }                                            from 'src/environments/environment';

@Component({
  selector: 'app-joboccupation',
  templateUrl: './joboccupation.component.html',
  styleUrls: ['./joboccupation.component.css']
})
export class JoboccupationComponent implements OnInit {

  joboccupationForm : FormGroup
  dataUrl           : String = environment.api_url
  prefix            : String = environment.prefix

  data              = [];
  edited            : Boolean   = false
  templateData      = [ ["job_code","job_core_id","class_1","class_2","class_3"], [] ]
  wopts             : XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName          : string = 'job_occupation.xlsx';
  
  constructor(private fb                          : FormBuilder,
              private jobOccupationService        : JobOccupationService,
              private cd                          : ChangeDetectorRef,
              private getCurrentUserService       : GetCurrentUserService,
              private dynamicScriptLoader         : DynamicScriptLoaderService,
              private sweetalertService           : SweetalertService,
              private logService                  : LogService) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()

    let self = this;

    $(document).on('click', '#editJobOccupation', function(){
      let id = $(this).data('id');
      return self.jobOccupationService.getJobOccupationById(id)
                        .subscribe((data) => {
                          self.joboccupationForm.setValue({
                            id              : data.id,
                            job_code        : data.job_code,
                            job_core_id     : data.job_core_id,
                            class_1         : data.class_1,
                            class_2         : data.class_2,
                            class_3         : data.class_3,
                            update_by       : data.updateBy,
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
    });

    $(document).on('click', '#deleteJobOccupation', function(){
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
          return   self.jobOccupationService.destroyJobOccupation(id)
                    .subscribe(() => {

                      // save log
                      let user = self.getCurrentUserService.getUserData()
                      
                      let message = "User " + user.name + " Delete Job Occupation" + self.job_code.value

                      let category  = "Job Occupation"
                
                      const log = self.logService.storeLog(user, category, message).toPromise()

                      log.then(() => {

                        // Refresh Datatables after Save Job Occupation
                        $('#joboccupationDatatables').DataTable().ajax.reload();
                                
                        // Reset Form after Delete Job Occupation
                        self.resetForm();
                      })
                    });
            }
          })
    });
  }

  public createJobOccupation(){
    let user = this.getCurrentUserService.getUserData()

    this.joboccupationForm.patchValue({
      update_by : user.name
    })

    return this.jobOccupationService.saveJobOccupation(this.joboccupationForm.value)
                  .subscribe(() => {
                    // save log
                    let user = this.getCurrentUserService.getUserData()
      
                    let message = null // siapin variable message

                    if(this.id.value)
                      message   = "User " + user.name + " Update Job Occupation " + this.job_code.value
                    else 
                      message   = "User " + user.name + " Add new Job Occupation"

                    let category  = "Job Occupation"
              
                    const log = this.logService.storeLog(user, category, message).toPromise()

                    log.then(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Job Occupation Has Been Save')

                      // Refresh Datatables after Save Job Occupation
                      $('#joboccupationDatatables').DataTable().ajax.reload();
                              
                      // Reset Form after Save Job Occupation
                      this.resetForm();
                    })
                  })
  }

  public downloadTemplate(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.templateData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public onFileChange(evt: any) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data)
    }
    reader.readAsBinaryString(target.files[0]);
    
  }

  public uploadJobOccupation() { 

    Swal.fire({
      title: 'Are you sure?',
      text: "You will upload Job Occupation",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Upload it!'
    }).then((result) => {
      if (result.value) {

        const job_occupation  = this.convertToJSON(this.data)
        let occupation        = this.jobOccupationService.saveViaExcel(job_occupation).toPromise()

        occupation.then(() => {
          this.resetForm() //reset formnya kalau sudah kesimpen
          $('#joboccupationDatatables').DataTable().ajax.reload();
        })
        
      }
    })

  }

  private convertToJSON(array) {
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        objArray[i - 1][key] = array[i][k]
      }
    }
  
    return objArray;
  }

  private createForm(){
    this.joboccupationForm = this.fb.group({
      id                        : [''],
      job_code                  : ['',[Validators.required]],
      job_core_id               : ['',[Validators.required]],
      class_1                   : ['',[Validators.required]],
      class_2                   : ['',[Validators.required]],
      class_3                   : ['',[Validators.required]],
      update_by                 : ['']
    });
  }

  public resetForm(){
    this.id.reset()
    this.job_code.reset()
    this.job_core_id.reset()
    this.class_1.reset()
    this.class_2.reset()
    this.class_3.reset()

    // back to normal button
    if(this.edited){
      this.edited = false
    }
  }

  get id(){
    return this.joboccupationForm.get('id');
  }
  get job_code(){
    return this.joboccupationForm.get('job_code');
  }
  get job_core_id(){
    return this.joboccupationForm.get('job_core_id');
  }
  get class_1(){
    return this.joboccupationForm.get('class_1');
  }
  get class_2(){
    return this.joboccupationForm.get('class_2');
  }
  get class_3(){
    return this.joboccupationForm.get('class_3');
  }

  public initDataTables(){
    let self = this;
    $(document).ready(function() {
      $('#joboccupationDatatables').DataTable({
        ajax: {
                'type'	      : 'GET',
                'url'	        : self.dataUrl +  '/list/jobs-occupation',
                'contentType' : 'application/json',
              },
        'serverSide' : true,
        'responsive': true,
        columns : [{
                data : 'id'
              }, {
                data : 'job_code'
              }, {
                data : 'class_1',
                width : "10%"
              },{
                data : 'class_2'
              },{
                data : 'class_3'
              },{
                data : 'updateBy'
              },{
                data: null, 
                searchable: false,
                orderable: false,
                render: function (data, type, row) {
                return `
                    <button id="editJobOccupation"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteJobOccupation"
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
