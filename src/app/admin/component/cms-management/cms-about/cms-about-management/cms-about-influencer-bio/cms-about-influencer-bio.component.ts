// Core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                      from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';

// package
import { SortablejsOptions } from 'ngx-sortablejs';
import Swal                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                          from 'src/environments/environment';

// service 
import { CmsAboutInfluencerBioService }         from './cms-about-influencer.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';

@Component({
  selector: 'app-cms-about-influencer-bio',
  templateUrl: './cms-about-influencer-bio.component.html',
  styleUrls: ['./cms-about-influencer-bio.component.css']
})
export class CmsAboutInfluencerBioComponent implements OnInit {

  constructor(  private fb                : FormBuilder,
    private uploadFileService             : UploadFileService,
    private cmsAboutInfluencerBioService  : CmsAboutInfluencerBioService,
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

  influencer_picture                    : String    = null;
  imgUrl                                : String    = null;
  selectedFiles                         : FileList
  currentFileUpload                     : File
  progress_influencer: { percentage                : number }  = { percentage: 0 }   
  progress: { percentage                : number }  = { percentage: 0 }   
  //--------------------- VARIABLE END -----------------------//

  public createForm(){
    this.formCms = this.fb.group({
      id                        : [''],
      title                     : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      category                  : ['about-influencer-bio'],
      influencer_name           : ['',[Validators.required]],
      influencer_profession     : ['',[Validators.required]],
      influencer_wording        : ['',[Validators.required]],
      influencer_picture        : ['',[Validators.required]],
      youtube_code              : ['',[Validators.required]],
    });
  }

  public createCms() {
    this.cmsAboutInfluencerBioService.saveCarousel(this.formCms.value)
    .subscribe((datas) => {

    // notification
    this.sweetalertService.yourWorkHasBeenSaved('Influencer Biography Has Been Save')

    })
  }

  public loadData() {
    this.cmsAboutInfluencerBioService.getCarouselByCategory('about-influencer-bio')
      .subscribe((data) => {
          if(data[0] !== undefined) {
            this.formCms.patchValue({
              id                : data[0].id,
              category          : data[0].category,
              image             : data[0].image,
              influencer_picture: data[0].influencer_picture,
              influencer_name   : data[0].influencer_name,
              influencer_profession: data[0].influencer_profession,
              influencer_wording: data[0].influencer_wording,
              youtube_code      : data[0].youtube_code,
            })

            // set image
            this.imgUrl             = data[0].image               != null ? this.image_url + data[0].image              : null
            this.influencer_picture = data[0].influencer_picture  != null ? this.image_url + data[0].influencer_picture : null
          }
      })
  }

  get id(){
    return this.formCms.get('id');
  }
  get title(){
    return this.formCms.get('title');
  }
  get influencer_name(){
    return this.formCms.get('influencer_name');
  }
  get influencer_profession(){
    return this.formCms.get('influencer_profession');
  }
  get influencer_wording(){
    return this.formCms.get('influencer_wording');
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

  public changeInfluencer(event){

    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/carousel', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress_influencer.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString           = event.body.toString()
        let myObj                     = JSON.parse(EventBodyString)
        this.influencer_picture       = myObj.fileUrl
        this.formCms.patchValue({ influencer_picture : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

}
