// Core
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef }                                      from '@angular/core';
import { FormBuilder, FormGroup, Validators }                     from '@angular/forms';
import { Router, ActivatedRoute }                                                 from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType }                from '@angular/common/http';

// Environtment
import { environment }                                            from '../../../../environments/environment';

// Service
import { MemberGetMemberService }                                 from './member-get-member.service';

// Library
declare var $: any;
import * as moment from 'moment';

// Shared Service
import { UploadFileService }                                      from '../../shared/service/upload-file.service';
import { SweetalertService }                                      from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }                             from '../../shared/service/dynamic-script.service';

@Component({
  selector: 'app-member-get-member-edit',
  templateUrl: './pages/member-get-member-edit.component.html',
  styleUrls: ['./pages/member-get-member-edit.component.css']
})
export class MemberGetMemberEditComponent implements OnInit {

  editMGM                 : FormGroup;
  image_url                         = environment.image_url
  prefix                  : String  = environment.prefix

  @ViewChild('itemSelect') input: ElementRef;

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }
  today  = new Date();
  selected_end = null;

  constructor(  private fb                    : FormBuilder,
                private route                 : ActivatedRoute,
                private uploadFileService     : UploadFileService,
                private memberGetMemberService: MemberGetMemberService,
                private router                : Router,
                private sweetalertService     : SweetalertService,) 
  { 
    this.initValue()
    this.createForm()
  }

  ngOnInit() {
  }

  public updateMGM(){
    let date   = $('#start_date').val().split(" ")
    this.editMGM.patchValue({
      date: date
    })

    this.route.params.subscribe(params => {
      return this.memberGetMemberService.updateMemberGetMember(params['id'], this.editMGM.value)
                        .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Member Get Member Has Been Updated')
                          this.router.navigate([this.prefix + '/member-get-member'])
                        })
    })
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/member-get-member','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.editMGM.patchValue({ image : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  private initValue(){
    this.route.params.subscribe(params => {
      return this.memberGetMemberService.getMemberByMemberById(params['id'])
                  .subscribe((data) => {
                    let start_date  = moment(data.start_date).format('DD-MM-YYYY')
                    let end_date    = moment(data.end_date).format('DD-MM-YYYY')
                    
                    this.editMGM.patchValue({
                        maximum_amount  : data.maximum_amount,
                        reward          : data.reward,
                        image           : data.image,
                        date            : [start_date, end_date]
                      })
                      this.imgUrl = this.image_url + "" + data.image
                  })
    })
  }

  protected createForm(){
    this.editMGM = this.fb.group({
      maximum_amount            : ['',[Validators.required]],
      reward                    : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      date                      : ['']
    });
  }

  get date() {
    return this.editMGM.get('date')
  }
  get maximum_amount(){
    return this.editMGM.get('maximum_amount');
  }
  get reward(){
    return this.editMGM.get('reward');
  }
  get image(){
    return this.editMGM.get('image');
  }

}
