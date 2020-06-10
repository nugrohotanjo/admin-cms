// Core
import { Component, OnInit }                  from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute }                             from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                        from '../../../../environments/environment';

// Service
import { SinglePageService }                  from './single-page.service';

// Shared Service
import { UploadFileService }                  from '../../shared/service/upload-file.service';
import { SweetalertService }                  from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-single-page-edit',
  templateUrl: './pages/single-page-edit.component.html',
  styleUrls: ['./pages/single-page-edit.component.css']
})
export class SinglePageEditComponent implements OnInit {

  editSinglePage       : FormGroup
  image_url                     = environment.image_url
  prefix              : String  = environment.prefix

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private uploadFileService     : UploadFileService,
                private singlePageService     : SinglePageService,
                private fb                    : FormBuilder,
                private route                 : ActivatedRoute,
                private router                : Router,
                private sweetalertService     : SweetalertService, ) 
  {
    this.createForm()
    this.initValue()
  }

  ngOnInit() {
  }

  public updateSinglePage(){
    this.route.params.subscribe(params => {
      return this.singlePageService.updateSinglePage(params['id'], this.editSinglePage.value)
                        .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Single Page Has Been Updated')
                          this.router.navigate([this.prefix + '/single-page'])
                        })
    })
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
        this.editSinglePage.patchValue({ thumbnail : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  private initValue(){
    this.route.params.subscribe(params => {
      return this.singlePageService.getSinglePageById(params['id'])
                  .subscribe((data) => {
                    this.editSinglePage.setValue({
                        title               : data.title,
                        content             : data.content,
                        thumbnail           : data.thumbnail,
                        status              : data.status_publish,
                        meta_description    : data.meta_description,
                        meta_keyword        : data.meta_keyword,
                      })
                      
                    this.imgUrl = this.image_url + "" + data.thumbnail
                  })
    })
  }

  private createForm(){
    this.editSinglePage = this.fb.group({
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
    return this.editSinglePage.get('title')
  }
  get thumbnail(){
    return this.editSinglePage.get('thumbnail')
  }
  get content(){
    return this.editSinglePage.get('content')
  }
  get status(){
    return this.editSinglePage.get('status')
  }
  get meta_description(){
    return this.editSinglePage.get('meta_description')
  }
  get meta_keyword(){
    return this.editSinglePage.get('meta_keyword')
  }

}
