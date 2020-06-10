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
import { CmsHomepageWhyOurProduct }                from './cms-homepage-why-our-product'
import { CmsCarouselPosition }                  from '../../../../../shared/models/cmscarouselposition'

// service 
import { CmsHomepageWhyOurProductService }         from './cms-homepage-why-our-product.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';
import { CmsCarouselPositionService }           from '../../../../../shared/service/cmscarouselposition.service';
import { DynamicScriptLoaderService } from 'src/app/admin/shared/service/dynamic-script.service'

@Component({
  selector: 'app-cms-homepage-why-our-product',
  templateUrl: './cms-homepage-why-our-product.component.html',
  styleUrls: ['./cms-homepage-why-our-product.component.css']
})
export class CmsHomepageWhyOurProductComponent implements OnInit {

  constructor(  private fb                            : FormBuilder,
                private uploadFileService                         : UploadFileService,
                private CmsHomepageWhyOurProductService           : CmsHomepageWhyOurProductService,
                private sweetalertService                         : SweetalertService,
                private cmsCarouselPositionService                : CmsCarouselPositionService,
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
  ListCarousel                          : Array<CmsHomepageWhyOurProduct> = [];
  idCmsCarouselPosition                             = null;
  //--------------------- VARIABLE END -----------------------//

  public createForm(){
    this.formCms = this.fb.group({
      id                        : [''],
      title                     : ['',[Validators.required]],
      description               : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      category                  : ['homepage-why-our-product']
    });
  }

  public resetForm() {
    this.id.reset();
    this.title.reset();
    this.description.reset();
    this.image.reset();

    // remove imagenya
    this.imgUrl = null;
    this.progress.percentage = 0
  }

  public createCms() {
    this.CmsHomepageWhyOurProductService.saveCarousel(this.formCms.value)
    .subscribe((datas) => {

      // cari datanya kalau udah ada gak usah di save lagi ke carousel position
      const index = this.ListCarousel.findIndex(x => x.id === datas.id);
      
      if (index === -1) {
        this.ListCarousel.push(datas)

        // save data carousel
        let data = new CmsCarouselPosition(this.idCmsCarouselPosition,'homepage-why-our-product',JSON.stringify(this.ListCarousel));
        this.cmsCarouselPositionService.saveCarousel(data)
                  .subscribe((data) => {
                    // Reset form nya
                    this.resetForm();

                    // notification
                    this.sweetalertService.yourWorkHasBeenSaved('Carousel Product Has Been Save')

                    // refresh carousel
                    this.loadData();
                  })
      } else {
        this.ListCarousel[index] = datas;
        
        // save data carousel
        let data = new CmsCarouselPosition(this.idCmsCarouselPosition,'homepage-why-our-product',JSON.stringify(this.ListCarousel));
        this.cmsCarouselPositionService.saveCarousel(data)
              .subscribe((data) => {
                    // Reset form nya
                    this.resetForm();

                    // notification
                    this.sweetalertService.yourWorkHasBeenSaved('Carousel Product Has Been Save')

                    // refresh carousel
                    this.loadData();
              })
      }


      
      
    })
  }

  public loadData() {

    // get list position
    this.cmsCarouselPositionService.getCarouselByCategory('homepage-why-our-product')
        .subscribe((data) => {
          this.idCmsCarouselPosition  = data ? data.id : null;
          this.ListCarousel           = data  ? JSON.parse(data.content) : [];
        })
  }

  public editCarousel(id) {
    this.CmsHomepageWhyOurProductService.getCarouselById(id)
      .subscribe((data) => {
        this.formCms.setValue({
          id                    : data.id,
          title                 : data.title,
          image                 : data.image,
          description           : data.description,
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
    this.CmsHomepageWhyOurProductService.destroyCarousel(id)
            .subscribe((data) => {
              // notification
              this.sweetalertService.yourWorkHasBeenSaved('Carousel Product Has Been Deleted')

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
    let data = new CmsCarouselPosition(this.idCmsCarouselPosition,'homepage-why-our-product',JSON.stringify(this.ListCarousel));

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
  get title(){
    return this.formCms.get('title');
  }
  get description(){
    return this.formCms.get('description');
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

  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoaderService.load('Tooltip').then(data => {
    // Script Loaded Successfully
    
  }).catch(error => console.log(error));
  }

}
