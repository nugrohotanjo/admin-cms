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

// service 
import { CmsAboutBannerService }         from './cms-about-banner.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';

@Component({
  selector: 'app-cms-about-banner',
  templateUrl: './cms-about-banner.component.html',
  styleUrls: ['./cms-about-banner.component.css']
})
export class CmsAboutBannerComponent implements OnInit {

  constructor(  private fb                : FormBuilder,
    private uploadFileService             : UploadFileService,
    private cmsAboutBannerService         : CmsAboutBannerService,
    private sweetalertService             : SweetalertService) { }

ngOnInit() {
this.createForm();

// Load Data
this.loadData();
}

//--------------------- VARIABLE START ---------------------//
formCms                              : FormGroup;
edited                               : Boolean    = false

image_url                                         = environment.image_url
prefix                                : String    = environment.prefix

imgUrl                                : String    = null;
url_thumbnail                         : String    = null;
selectedFiles                         : FileList
currentFileUpload                     : File
progress          : { percentage                : number }  = { percentage: 0 }   
progress_thumbnail: { percentage                : number }  = { percentage: 0 }   
//--------------------- VARIABLE END -----------------------//

public createForm(){
  this.formCms = this.fb.group({
    id                        : [''],
    title                     : ['',[Validators.required]],
    image                     : ['',[Validators.required]],
    thumbnail                 : ['',[Validators.required]],
    category                  : ['about-banner'],
    button_1                  : ['',[Validators.required]],
    button_2                  : ['',[Validators.required]],
    youtube_code              : ['',[Validators.required]],
  });
}

public createCms() {
  this.cmsAboutBannerService.saveCarousel(this.formCms.value)
  .subscribe((datas) => {

  // notification
  this.sweetalertService.yourWorkHasBeenSaved('All Insurance Has Been Save')

  })
}

public loadData() {
  this.cmsAboutBannerService.getCarouselByCategory('about-banner')
    .subscribe((data) => {
        if(data[0] !== undefined) {
          this.formCms.patchValue({
            id                : data[0].id,
            title             : data[0].title,
            category          : data[0].category,
            image             : data[0].image,
            thumbnail         : data[0].influencer_picture,
            button_1          : data[0].button_1,
            button_2          : data[0].button_2,
            youtube_code      : data[0].youtube_code,
          })

          // set image
          this.imgUrl = this.image_url + data[0].image

          // set image mobile
          this.url_thumbnail = this.image_url + data[0].influencer_picture
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
get thumbnail(){
  return this.formCms.get('thumbnail');
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

public changeMobilePicture(event){

  this.progress.percentage = 0
  this.selectedFiles = event.target.files
  this.currentFileUpload = this.selectedFiles.item(0)
  this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/carousel', 'image').subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress_thumbnail.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      let EventBodyString           = event.body.toString()
      let myObj                     = JSON.parse(EventBodyString)
      this.url_thumbnail       = myObj.fileUrl
      this.formCms.patchValue({ thumbnail : myObj.fileName })
    }
  })

  this.selectedFiles = undefined
}


}
