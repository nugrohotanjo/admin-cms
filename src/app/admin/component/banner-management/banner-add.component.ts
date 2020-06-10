// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                          from 'src/environments/environment';

// Service
import { BannerService }                          from './banner.service';

// SharedService
import { SweetalertService }                    from '../../shared/service/sweetalert.service';
import { UploadFileService }                  from '../../shared/service/upload-file.service';

@Component({
  selector: 'app-banner-add',
  templateUrl: './pages/banner-add.component.html',
  styleUrls: ['./pages/banner-add.component.css']
})
export class BannerAddComponent implements OnInit {

  addBanner : FormGroup
  image_url                     = environment.image_url
  prefix              : String  = environment.prefix

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private fb                : FormBuilder, 
                private uploadFileService : UploadFileService,
                private bannerService     : BannerService, 
                private router            : Router,
                private sweetalertService : SweetalertService, ) 
  { 
    this.createForm()
  }

  ngOnInit() {
  }

  public createBanner(){
    return this.bannerService.saveBanner(this.addBanner.value)
                      .subscribe(()=>{
                        this.sweetalertService.yourWorkHasBeenSaved('Banner Has Been Save')
                        this.router.navigate([this.prefix + '/banner'])
                      })
  }  

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/banner', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.addBanner.patchValue({ thumbnail : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  public createMenu(){
    this.bannerService.saveBanner(this.addBanner.value)
                      .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Banner Has Been Save')
                          this.router.navigate([this.prefix + '/banner'])
                      });
  }

  private createForm(){
    this.addBanner = this.fb.group({
      name                      : ['', [Validators.required]],
      description               : ['',[Validators.required]],
      link                      : ['',[Validators.required]],
      thumbnail                 : ['',[Validators.required]],
      banner_alt                : ['',[Validators.required]],
    });
  }

  get name(){
    return this.addBanner.get('name')
  }

  get description(){
    return this.addBanner.get('description')
  }

  get thumbnail(){
    return this.addBanner.get('thumbnail')
  }

  get banner_alt(){
    return this.addBanner.get('banner_alt')
  }

}
