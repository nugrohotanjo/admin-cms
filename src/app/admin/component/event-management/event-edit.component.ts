// Core
import { Component, OnInit }                        from '@angular/core'
import { FormBuilder, FormGroup, Validators }       from '@angular/forms'
import { Router, ActivatedRoute }                   from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType }  from '@angular/common/http';

// Environtment
import { environment }                        from '../../../../environments/environment';

// Service
import { EventCategoryService }               from '../event-category-management/event-category.service';
import { EventService }                       from './event.service'

// Model
import { EventCategory }                      from '../event-category-management/event-category';

// Shared Service
import { UploadFileService }                  from '../../shared/service/upload-file.service';
import { SweetalertService }                  from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './pages/event-edit.component.html',
  styleUrls: ['./pages/event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  editEvent               : FormGroup
  eventCategoryList       : EventCategory[]
  image_url               : String  = environment.image_url
  prefix                  : String  = environment.prefix

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(  private fb                    : FormBuilder,
                private route                 : ActivatedRoute,
                private router                : Router,
                private eventService          : EventService,
                private eventCategoryService  : EventCategoryService,
                private uploadFileService     : UploadFileService,
                private sweetalertService     : SweetalertService) 
  {
    this.createForm()
    this.initCategory()
    this.initValue()
  }

  ngOnInit() {}

  public updateEvent(){
    this.route.params.subscribe(params => {
      return this.eventService.updateEvent(params['id'], this.editEvent.value)
                        .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Event Has Been Updated')
                          this.router.navigate([this.prefix + '/event'])
                        })
    })
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, 'event', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.editEvent.patchValue({ thumbnail : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  public initValue(){
    this.route.params.subscribe(params => {
      return this.eventService.getEventById(params['id'])
                  .subscribe((data) => {
                    this.editEvent.setValue({
                        title               : data.title,
                        content             : data.content,
                        thumbnail           : data.cover,
                        status              : data.status_publish,
                        category            : data.category,
                        meta_description    : data.meta_description,
                        meta_keyword        : data.meta_keyword,
                      })

                    this.imgUrl = this.image_url + "" + data.cover
                  })
    })
  }

  private initCategory(){
    this.eventCategoryService.getAllCategory()
                .subscribe((data) => {
                  this.eventCategoryList = data
                })
  }

  public editorConfig = {
    height: '400px',
    minHeight: '500px',
    width: '100%',
    url: this.image_url
  };

  private createForm(){
    this.editEvent = this.fb.group({
      title                       : ['',[Validators.required, Validators.minLength(4)]],
      thumbnail                   : ['',[Validators.required]],
      content                     : ['',[Validators.required]],
      status                      : ['',[Validators.required]],
      category                    : ['',[Validators.required]],
      meta_description            : ['',[Validators.required]],
      meta_keyword                : ['',[Validators.required]],
    });
  }

  get title(){
    return this.editEvent.get('title')
  }
  get thumbnail(){
    return this.editEvent.get('thumbnail')
  }
  get content(){
    return this.editEvent.get('content')
  }
  get status(){
    return this.editEvent.get('status')
  }
  get category(){
    return this.editEvent.get('category')
  }
  get meta_description(){
    return this.editEvent.get('meta_description')
  }
  get meta_keyword(){
    return this.editEvent.get('meta_keyword')
  }

}
