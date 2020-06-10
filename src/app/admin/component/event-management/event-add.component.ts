// Core
import { Component, OnInit }                  from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router }                             from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                        from '../../../../environments/environment';

// Service
import { EventCategoryService }               from '../event-category-management/event-category.service';
import { EventService }                       from './event.service'

// Model
import { EventCategory }                      from '../event-category-management/event-category'

// Shared Service
import { UploadFileService }                  from '../../shared/service/upload-file.service';
import { SweetalertService }                  from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './pages/event-add.component.html',
  styleUrls: ['./pages/event-add.component.css'],
  providers: [UploadFileService]
})
export class EventAddComponent implements OnInit {

  addEvent            : FormGroup
  eventCategoryList   : EventCategory[]
  image_url                     = environment.image_url
  prefix              : String  = environment.prefix

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private uploadFileService     : UploadFileService,
                private eventService           : EventService,
                private fb                    : FormBuilder,
                private router                : Router,
                private eventCategoryService  : EventCategoryService,
                private sweetalertService     : SweetalertService, ) 
  {
    this.createForm()
    this.initCategory()
  }

  ngOnInit() {}

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, 'event','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.addEvent.patchValue({ thumbnail : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  public createEvent(){
    return this.eventService.saveEvent(this.addEvent.value)
                    .subscribe(() => {
                      this.sweetalertService.yourWorkHasBeenSaved('Event Has Been Save')
                      this.router.navigate([this.prefix + '/event'])
                    });
  }

  private initCategory(){
    this.eventCategoryService.getAllCategory()
                .subscribe((data) => {
                  this.eventCategoryList = data
                })
  }

  private createForm(){
    this.addEvent = this.fb.group({
      title                       : ['', [Validators.required, Validators.minLength(4)]],
      thumbnail                   : ['',[Validators.required]],
      content                     : ['',[Validators.required]],
      status                      : ['',[Validators.required]],
      category                    : ['',[Validators.required]],
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
    return this.addEvent.get('title')
  }
  get thumbnail(){
    return this.addEvent.get('thumbnail')
  }
  get content(){
    return this.addEvent.get('content')
  }
  get status(){
    return this.addEvent.get('status')
  }
  get category(){
    return this.addEvent.get('category')
  }
  get meta_description(){
    return this.addEvent.get('meta_description')
  }
  get meta_keyword(){
    return this.addEvent.get('meta_keyword')
  }

}
