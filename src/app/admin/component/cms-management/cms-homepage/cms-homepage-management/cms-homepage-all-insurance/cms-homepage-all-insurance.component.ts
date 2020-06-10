// Core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                      from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';

// package
import { SortablejsOptions } from 'ngx-sortablejs';
import Swal                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                          from 'src/environments/environment';

// Model
import { CmsHomepageAllInsurance }              from './cms-homepage-all-insurance'
import { CmsCarouselPosition }                  from '../../../../../shared/models/cmscarouselposition'

// service 
import { CmsHomepageAllInsuranceService }         from './cms-homepage-all-insurance.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';
import { DynamicScriptLoaderService } from 'src/app/admin/shared/service/dynamic-script.service'

@Component({
  selector: 'app-cms-homepage-all-insurance',
  templateUrl: './cms-homepage-all-insurance.component.html',
  styleUrls: ['./cms-homepage-all-insurance.component.css']
})
export class CmsHomepageAllInsuranceComponent implements OnInit {

  constructor(  private fb                            : FormBuilder,
                private uploadFileService             : UploadFileService,
                private cmsHomepageAllInsuranceService  : CmsHomepageAllInsuranceService,
                private sweetalertService             : SweetalertService,
                private dynamicScriptLoaderService    : DynamicScriptLoaderService) { }

ngOnInit() {
  this.createForm();
  this.loadScripts();
  // Load Data
  this.loadData();
}

//--------------------- VARIABLE START ---------------------//
formCms                              : FormGroup;
edited                               : Boolean    = false

image_url                                         = environment.image_url
prefix                                : String    = environment.prefix

imgUrl                                : String    = null;
selectedFiles                         : FileList
currentFileUpload                     : File
progress: { percentage                : number }  = { percentage: 0 }   
//--------------------- VARIABLE END -----------------------//

public createForm(){
  this.formCms = this.fb.group({
    id                        : [''],
    title                     : ['',[Validators.required]],
    insurance_name            : ['',[Validators.required]],
    description               : ['',[Validators.required]],
    image                     : ['',[Validators.required]],
    link                      : ['',[Validators.required]],
    category                  : ['homepage-all-insurance']
  });
}

public createCms() {
  this.cmsHomepageAllInsuranceService.saveCarousel(this.formCms.value)
  .subscribe((datas) => {

  // notification
  this.sweetalertService.yourWorkHasBeenSaved('All Insurance Has Been Save')
    
  })
}

public loadData() {
  this.cmsHomepageAllInsuranceService.getCarouselByCategory('homepage-all-insurance')
          .subscribe((data) => {
            if(data[0] !== undefined) {
              this.formCms.patchValue({
                id                : data[0].id,
                title             : data[0].title,
                insurance_name    : data[0].insurance_name,
                image             : data[0].image,
                link              : data[0].link,
                description       : data[0].description,
              })

              // set image
              this.imgUrl = this.image_url + data[0].image
            }
          })
}

get id(){
  return this.formCms.get('id');
}
get title(){
  return this.formCms.get('title');
}
get insurance_name(){
  return this.formCms.get('insurance_name');
}
get description(){
  return this.formCms.get('description');
}
get image(){
  return this.formCms.get('image');
}
get link(){
  return this.formCms.get('link');
}

public selectFile(event){

  this.progress.percentage = 0
  this.selectedFiles = event.target.files
  this.currentFileUpload = this.selectedFiles.item(0)
  this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/carousel', 'image').subscribe(event => {
  if (event.type === HttpEventType.UploadProgress) {
  this.progress.percentage = Math.round(100 * event.loaded / event.total);
  } else if (event instanceof HttpResponse) {
    let EventBodyString = event.body.toString()
    let myObj           = JSON.parse(EventBodyString)
    this.imgUrl         = myObj.fileUrl
    this.formCms.patchValue({ image : myObj.fileName })
    }
  })

  this.selectedFiles = undefined
}

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoaderService.load('Tooltip').then(data => {
    // Script Loaded Successfully
    
  }).catch(error => console.log(error));
  }

}
