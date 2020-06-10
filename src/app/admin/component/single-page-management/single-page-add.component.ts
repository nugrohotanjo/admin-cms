// Core
import { Component, OnInit }                  from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router }                             from "@angular/router";
import { HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                        from '../../../../environments/environment';

// Service
import { SinglePageService }                  from './single-page.service';

// Shared Service
import { UploadFileService }                  from '../../shared/service/upload-file.service';
import { SweetalertService }                  from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-single-page-add',
  templateUrl: './pages/single-page-add.component.html',
  styleUrls: ['./pages/single-page-add.component.css'],
  providers: [UploadFileService]
})
export class SinglePageAddComponent implements OnInit {

  addSinglePage       : FormGroup
  image_url                     = environment.image_url
  prefix              : String  = environment.prefix

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private uploadFileService     : UploadFileService,
                private singlePageService     : SinglePageService,
                private fb                    : FormBuilder,
                private router                : Router,
                private sweetalertService     : SweetalertService, ) 
  { 
    this.createForm()
  }

  ngOnInit() {
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload,'single-page','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl         = myObj.fileUrl
        this.addSinglePage.patchValue({ thumbnail : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  public createSinglePage(){
    return this.singlePageService.saveSinglePage(this.addSinglePage.value)
                      .subscribe(() => {
                        this.sweetalertService.yourWorkHasBeenSaved('Single Page Has Been Save')
                        this.router.navigate([this.prefix + '/single-page'])
                      })
  }

  private createForm(){
    this.addSinglePage = this.fb.group({
      title                       : ['', [Validators.required, Validators.minLength(4)]],
      thumbnail                   : ['',[Validators.required]],
      content                     : ['',[Validators.required]],
      status                      : ['',[Validators.required]],
      meta_description            : ['',[Validators.required]],
      meta_keyword                : ['',[Validators.required]],
    });
  }

  public editorConfig = {
    height: '400px',
    minHeight: '500px',
    width: '100%',
    url: this.image_url
  };

  get title(){
    return this.addSinglePage.get('title')
  }
  get thumbnail(){
    return this.addSinglePage.get('thumbnail')
  }
  get content(){
    return this.addSinglePage.get('content')
  }
  get status(){
    return this.addSinglePage.get('status')
  }
  get meta_description(){
    return this.addSinglePage.get('meta_description')
  }
  get meta_keyword(){
    return this.addSinglePage.get('meta_keyword')
  }

}
