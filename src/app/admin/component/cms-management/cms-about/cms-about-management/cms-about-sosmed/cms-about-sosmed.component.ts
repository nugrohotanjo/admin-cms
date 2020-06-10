// Core
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }                      from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';

// package
import Swal                                     from 'sweetalert2/dist/sweetalert2.js';

// Environtment
import { environment }                          from 'src/environments/environment';

// service
import { CmsAboutSosmedService }                from './cms-about-sosmed.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';

@Component({
  selector: 'app-cms-about-sosmed',
  templateUrl: './cms-about-sosmed.component.html',
  styleUrls: ['./cms-about-sosmed.component.css']
})
export class CmsAboutSosmedComponent implements OnInit {

  constructor(  private fb                            : FormBuilder,
                private uploadFileService             : UploadFileService,
                private cmsAboutSosmedService         : CmsAboutSosmedService,
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
  progress: { percentage                : number }  = { percentage: 0 }   
  //--------------------- VARIABLE END -----------------------//

  public createForm(){
    this.formCms = this.fb.group({
      id                        : [''],
      title                     : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      category                  : ['about-sosmed'],
      button_1                  : ['',[Validators.required]],
      button_1_link             : ['',[Validators.required]],
      description               : ['',[Validators.required]],
    });
  }

  public createCms() {
    this.cmsAboutSosmedService.saveCarousel(this.formCms.value)
    .subscribe((datas) => {

    // notification
    this.sweetalertService.yourWorkHasBeenSaved('Sosmed Has Been Save')

    })
  }

  public loadData() {
    this.cmsAboutSosmedService.getCarouselByCategory('about-sosmed')
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

}
