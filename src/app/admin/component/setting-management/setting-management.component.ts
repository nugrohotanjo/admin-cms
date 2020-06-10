// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                          from 'src/environments/environment';

// service
import { SettingService }                          from './setting.service'

// SharedService
import { SweetalertService }                    from '../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../shared/service/upload-file.service';

@Component({
  selector: 'app-setting-management',
  templateUrl: './setting-management.component.html',
  styleUrls: ['./setting-management.component.css']
})
export class SettingManagementComponent implements OnInit {

  settingForm             : FormGroup;
  image_url                         = environment.image_url
  prefix                  : String  = environment.prefix

  logoUrl                 : String = null;
  logoTransparentUrl      : String = null;
  faviconUrl              : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private fb                : FormBuilder,
                private uploadFileService : UploadFileService, 
                private settingService    : SettingService,
                private sweetalertService : SweetalertService
  ) 
  { 
    this.createForm()
    this.initSetting()
  }

  ngOnInit() {
  }

  settingApply(){
    this.settingService.saveSetting(this.settingForm.value)
                  .subscribe(() => {
                    this.sweetalertService.yourWorkHasBeenSaved("Settings has been Save")
                  })
  }

  initSetting(){
    return this.settingService.getSettingById("0")
                  .subscribe((data) => {
                          let data_setting = JSON.parse(data.value);

                          if(data.value != null){
                            this.settingForm.patchValue({
                              site_name               : data_setting.site_name,
                              site_description        : data_setting.site_description,
                              logo                    : data_setting.logo,
                              logo_transparent        : data_setting.logo_transparent,
                              favicon                 : data_setting.favicon,
                              google_analytic         : data_setting.google_analytic,
                              copmany_name            : data_setting.copmany_name,
                              company_phone           : data_setting.company_phone,
                              company_fax             : data_setting.company_fax,
                              company_email           : data_setting.company_email,
                              company_whatsapp        : data_setting.company_whatsapp,
                              company_address         : data_setting.company_address,
                              company_description     : data_setting.company_description,
                              facebook_url            : data_setting.facebook_url,
                              twitter_url             : data_setting.twitter_url,
                              youtube_url             : data_setting.youtube_url,
                              instagram_url           : data_setting.instagram_url,
                              meta_description        : data_setting.meta_description,
                              meta_keyword            : data_setting.meta_keyword,
                            })

                            // Parsing url images
                            if(data_setting.logo){
                              this.logoUrl    = this.image_url + data_setting.logo
                            }

                            if(data_setting.logo){
                              this.logoTransparentUrl    = this.image_url + data_setting.logo_transparent
                            }

                            if(data_setting.favicon){
                              this.faviconUrl = this.image_url + data_setting.favicon
                            }
                          }
                          

                          
              });
  }

  public selectFile(event,type_image){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/setting','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)

        if(type_image === 'logo'){
          this.logoUrl = myObj.fileUrl
          this.settingForm.patchValue({ logo : myObj.fileName })
        }

        if(type_image === 'logo_transparent'){
          this.logoTransparentUrl = myObj.fileUrl
          this.settingForm.patchValue({ logo_transparent : myObj.fileName })
        }

        if(type_image === 'favicon'){
          this.faviconUrl = myObj.fileUrl
          this.settingForm.patchValue({ favicon : myObj.fileName })
        }        
      }
    })

    this.selectedFiles = undefined
  }

  private createForm(){
    this.settingForm = this.fb.group({
      site_name                       : ['',[Validators.required]],
      site_description                : [''],
      logo                            : [''],
      logo_transparent                : [''],
      favicon                         : [''],
      google_analytic                 : [''],
      company_name                    : [''],
      company_phone                   : [''],
      company_fax                     : [''],
      company_email                   : [''],
      company_whatsapp                : [''],
      company_address                 : [''],
      company_description             : [''],
      facebook_url                    : [''],
      twitter_url                     : [''],
      youtube_url                     : [''],
      instagram_url                   : [''],
      meta_description                : [''],
      meta_keyword                    : [''],
    });
  }

}
