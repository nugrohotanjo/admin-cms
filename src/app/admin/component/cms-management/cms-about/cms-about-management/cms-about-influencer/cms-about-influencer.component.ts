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
import { CmsAboutInfluencer }                   from './cms-about-influencer'
import { CmsCarouselPosition }                  from '../../../../../shared/models/cmscarouselposition'

// service 
import { CmsAboutInfluencerService }         from './cms-about-influencer.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';
import { CmsCarouselPositionService }           from '../../../../../shared/service/cmscarouselposition.service';

@Component({
  selector: 'app-cms-about-influencer',
  templateUrl: './cms-about-influencer.component.html',
  styleUrls: ['./cms-about-influencer.component.css']
})
export class CmsAboutInfluencerComponent implements OnInit {

  constructor(  private fb                            : FormBuilder,
                private uploadFileService             : UploadFileService,
                private cmsAboutInfluencerService     : CmsAboutInfluencerService,
                private sweetalertService             : SweetalertService,
                private cmsCarouselPositionService    : CmsCarouselPositionService) { }

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
  selectedFiles                         : FileList
  currentFileUpload                     : File
  progress: { percentage                : number }  = { percentage: 0 }   
  ListCarousel                          : Array<CmsAboutInfluencer> = [];
  idCmsCarouselPosition                             = null;
  //--------------------- VARIABLE END -----------------------//

  public createForm(){
    this.formCms = this.fb.group({
      id                        : [''],
      influencer_name            : ['',[Validators.required]],
      influencer_profession     : ['',[Validators.required]],
      influencer_wording        : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      youtube_code              : ['',[Validators.required]],
      category                  : ['about-influencer']
    });
  }

  public resetForm() {
    this.id.reset();
    this.influencer_name.reset();
    this.influencer_profession.reset();
    this.influencer_wording.reset();
    this.image.reset();
    this.youtube_code.reset();

    // remove imagenya
    this.imgUrl = null;
    this.progress.percentage = 0
  }

  public createCms() {
    this.cmsAboutInfluencerService.saveCarousel(this.formCms.value)
            .subscribe((datas) => {

              // cari datanya kalau udah ada gak usah di save lagi ke carousel position
              const index = this.ListCarousel.findIndex(x => x.id === datas.id);
              
              if (index === -1) {
                this.ListCarousel.push(datas)

                // save data carousel
                let data = new CmsCarouselPosition(this.idCmsCarouselPosition,'about-influencer',JSON.stringify(this.ListCarousel));
                this.cmsCarouselPositionService.saveCarousel(data)
                          .subscribe((data) => {
                            // Reset form nya
                            this.resetForm();

                            // notification
                            this.sweetalertService.yourWorkHasBeenSaved('Carousel Influencer Has Been Save')

                            // refresh carousel
                            this.loadData();
                          })
              } else {
                this.ListCarousel[index] = datas;
                
                // save data carousel
                let data = new CmsCarouselPosition(this.idCmsCarouselPosition,'about-influencer',JSON.stringify(this.ListCarousel));
                this.cmsCarouselPositionService.saveCarousel(data)
                      .subscribe((data) => {
                            // Reset form nya
                            this.resetForm();

                            // notification
                            this.sweetalertService.yourWorkHasBeenSaved('Carousel Influencer Has Been Save')

                            // refresh carousel
                            this.loadData();
                      })
              }
            })
  }

  public loadData() {

    // get list position
    this.cmsCarouselPositionService.getCarouselByCategory('about-influencer')
            .subscribe((data) => {
              this.idCmsCarouselPosition  = data ? data.id : null;
              this.ListCarousel           = data  ? JSON.parse(data.content) : [];
            })
  }

  public editCarousel(id) {
      this.cmsAboutInfluencerService.getCarouselById(id)
      .subscribe((data) => {
        this.formCms.setValue({
          id                    : data.id,
          influencer_name       : data.influencer_name,
          influencer_profession : data.influencer_profession,
          influencer_wording    : data.influencer_wording,
          image                 : data.image,
          youtube_code          : data.youtube_code,
          category              : data.category
        })

        // set image
        this.imgUrl = this.image_url + data.image
        window.scroll(0,0);
      })
  }

  public deleteCarousel(id) {

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
      this.cmsAboutInfluencerService.destroyCarousel(id)
              .subscribe((data) => {
                // notification
                this.sweetalertService.yourWorkHasBeenSaved('Carousel Influencer Has Been Deleted')

                // delete di arraynya
                const index = this.ListCarousel.findIndex(x => x.id === id);
                if (index !== undefined) this.ListCarousel.splice(index, 1);
                this.savePosition();
              })
      } // end if
      })


  }

  public eventOptions: SortablejsOptions = {
    onUpdate: (data) => {
    console.log(data)
    }
  };

  public savePosition() {
    let data = new CmsCarouselPosition(this.idCmsCarouselPosition,'about-influencer',JSON.stringify(this.ListCarousel));

    this.cmsCarouselPositionService.saveCarousel(data)
      .subscribe((data) => {
        // notification
        this.sweetalertService.yourWorkHasBeenSaved('Carousel Position Has Been Save')

        // refresh list
        this.loadData();
      })
  }

  get id(){
    return this.formCms.get('id');
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
  get youtube_code(){
    return this.formCms.get('youtube_code');
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
