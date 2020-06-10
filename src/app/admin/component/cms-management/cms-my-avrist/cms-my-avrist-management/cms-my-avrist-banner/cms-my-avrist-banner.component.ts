// Core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                      from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';

// package
import Swal                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                          from 'src/environments/environment';

// service
import { CmsMyAvristBannerService }                from './cms-my-avrist-banner.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';

@Component({
  selector: 'app-cms-my-avrist-banner',
  templateUrl: './cms-my-avrist-banner.component.html',
  styleUrls: ['./cms-my-avrist-banner.component.css']
})
export class CmsMyAvristBannerComponent implements OnInit {

  constructor(  private fb                            : FormBuilder,
    private uploadFileService                         : UploadFileService,
    private CmsMyAvristBannerService                  : CmsMyAvristBannerService,
    private sweetalertService                         : SweetalertService) { }

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

  influencer_picture                    : String    = null;
  imgUrl                                : String    = null;
  url_thumbnail                         : String    = null;
  selectedFiles                         : FileList
  currentFileUpload                     : File 
  progress_thumbnail: { percentage                : number }  = { percentage: 0 }   
  progress: { percentage                : number }  = { percentage: 0 }   
  //--------------------- VARIABLE END -----------------------//

  public createForm(){
    this.formCms = this.fb.group({
      id                        : [''],
      title                     : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      category                  : ['my-avrist-banner'],
      button_1                  : ['',[Validators.required]],
      button_1_link             : ['',[Validators.required]],
      description               : ['',[Validators.required]],
    });
  }

  public createCms() {
    this.CmsMyAvristBannerService.saveCarousel(this.formCms.value)
        .subscribe((datas) => {

        // notification
        this.sweetalertService.yourWorkHasBeenSaved('Banner Has Been Save')

        })
  }

  public loadData() {
    this.CmsMyAvristBannerService.getCarouselByCategory('my-avrist-banner')
        .subscribe((data) => {
          if(data[0] !== undefined) {
            this.formCms.patchValue({
              id                : data[0].id,
              category          : data[0].category,
              title             : data[0].title,
              image             : data[0].image,
              description       : data[0].description,
              button_1          : data[0].button_1,
              button_1_link     : data[0].button_1_link
            })

            // set image
            this.imgUrl             = data[0].image               != null ? this.image_url + data[0].image              : null
          }
        })
  }

  get id(){
    return this.formCms.get('id');
  }
  get title(){
    return this.formCms.get('title');
  }
  get description(){
    return this.formCms.get('description');
  }
  get button_1(){
    return this.formCms.get('button_1');
  }
  get button_1_link(){
    return this.formCms.get('button_1_link');
  }
  get image(){
    return this.formCms.get('image');
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

}
