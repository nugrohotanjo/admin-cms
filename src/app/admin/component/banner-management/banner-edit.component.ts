// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute }                   from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                          from 'src/environments/environment';

// Service
import { BannerService }                          from './banner.service';

// SharedService
import { SweetalertService }                    from '../../shared/service/sweetalert.service';
import { UploadFileService }                  from '../../shared/service/upload-file.service';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './pages/banner-edit.component.html',
  styleUrls: ['./pages/banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {

  editBanner              : FormGroup
  image_url                         = environment.image_url
  prefix                  : String  = environment.prefix

  imgUrl                  : String  = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private fb                : FormBuilder, 
                private route                 : ActivatedRoute,
                private router                : Router,
                private uploadFileService : UploadFileService,
                private bannerService     : BannerService, 
                private sweetalertService : SweetalertService, ) 
  {
    this.createForm()
    this.initValue()
  }

  ngOnInit() {
  }

  public updateBanner(){
    this.route.params.subscribe(params => {
      return this.bannerService.updateBanner(params['id'], this.editBanner.value)
                        .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Banner Has Been Updated')
                          this.router.navigate([this.prefix + '/banner'])
                        })
    })
  }

  public initValue(){
    this.route.params.subscribe(params => {
      return this.bannerService.getBannerById(params['id'])
                  .subscribe((data) => {
                    this.editBanner.setValue({
                        name            : data.name,
                        description     : data.description,
                        link            : data.link,
                        thumbnail       : data.image,
                        banner_alt      : data.banner_alt
                      })

                    this.imgUrl = this.image_url + "" + data.image
                  })
    })
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/banner','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.editBanner.patchValue({ thumbnail : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  private createForm(){
    this.editBanner = this.fb.group({
      name                      : ['', [Validators.required]],
      description               : ['',[Validators.required]],
      thumbnail                 : ['',[Validators.required]],
      link                      : ['',[Validators.required]],
      banner_alt                : ['',[Validators.required]],
    });
  }

  get name(){
    return this.editBanner.get('name')
  }

  get description(){
    return this.editBanner.get('description')
  }

  get thumbnail(){
    return this.editBanner.get('thumbnail')
  }

  get banner_alt(){
    return this.editBanner.get('banner_alt')
  }

}
