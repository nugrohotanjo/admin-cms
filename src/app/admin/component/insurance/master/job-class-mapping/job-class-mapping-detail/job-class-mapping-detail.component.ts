import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

// service
import { JobClassService }                                        from '../../job-class/job-class.service'
import { JobClassMappingService }                                 from '../job-class-mapping.service'
import { SweetalertService }                                      from 'src/app/admin/shared/service/sweetalert.service';
import { JobClassMapping }                                        from '../job-class-mapping';

// Environtment
import { environment }                                            from 'src/environments/environment';


@Component({
  selector: 'app-job-class-mapping-detail',
  templateUrl: './job-class-mapping-detail.component.html',
  styleUrls: ['./job-class-mapping-detail.component.css'],
  providers : [JobClassMappingService,JobClassService]
})
export class JobClassMappingDetailComponent implements OnInit {

  constructor(private jobClassService                   : JobClassService,
              private fb                                : FormBuilder,
              private route                             : ActivatedRoute,
              private router                            : Router,
              private jobClassMappingService            : JobClassMappingService,
              private sweetalertService                 : SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.loadData()
  }

  //-------------------- VARIABLE START -------------------//
  prefix              : String = environment.prefix

  JobClassMappingForm : FormGroup
  Jobclass            = []
  ListJobClass        = []
  ListSelectedJobClass : Array<JobClassMapping> = []
  
  // get product id from parameters
  ProductId     : String  = this.route.snapshot.paramMap.get("product_id")

  //-------------------- VARIABLE END -------------------//

  public async createJobClassMapping() {

    // delete dulu by product Id
    await this.jobClassMappingService.deleteByProductId(this.ProductId)
              .subscribe((data) => {
                // baru save product job nya
                this.jobClassMappingService.saveJobClassMapping(this.JobClassMappingForm.value.job_class)
                .subscribe((data) => {
                  this.sweetalertService.yourWorkHasBeenSaved('Job Class mapping Has Been Save')

                  this.router.navigate([this.prefix + '/job-class-mapping'])
                })
              })
  }

  protected createForm() {
    this.JobClassMappingForm = this.fb.group({
      job_class        : new FormArray([])
    })
  }
  
  public async loadData() {
    await this.loadDataJob()
    await this.loadDataExist()
  }

  public loadDataExist() {
    return this.jobClassMappingService.getJobClassByProductId(this.ProductId)
                  .subscribe((data) => {
                    this.ListSelectedJobClass = data
                    
                    if(this.ListSelectedJobClass[0] == undefined) {
                      this.addRow()
                    } else {
                      this.ListSelectedJobClass.map((data) => {
                        this.addRow(data)
                      })
                    }

                  })
  }

  public loadDataJob() {
    return this.jobClassService.getAll()
                      .subscribe((data) => {
                        this.Jobclass = data
                        let shit = JSON.parse('{"label":"Select Job", "value":null, "job_name":"Choose Job Class"}');
                        this.Jobclass.unshift(shit)
                      })
  }

  public addRow(data : JobClassMapping = null) {
    if(data == null) {
      this.t.push(this.fb.group({
        id              : [''],
        product_id      : [this.ProductId],
        job_class       : [''],
        class           : ['']
      }));
    } else {
      this.t.push(this.fb.group({
        id              : [data.id],
        product_id      : [this.ProductId],
        job_class       : [data.job_id],
        class           : [data.job_class_mapping]
      }));
    }
    
  }

  public removeRow() {
    let i = this.t.length
    this.t.removeAt(i - 1);
  }

  get f()         { return this.JobClassMappingForm.controls; }
  get t()         { return this.f.job_class as FormArray; }
  get job_class()  { return this.JobClassMappingForm.get('job_class') }

}
