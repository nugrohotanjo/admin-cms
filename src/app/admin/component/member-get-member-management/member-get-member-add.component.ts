// Core
import { Component, OnInit, TemplateRef }                         from '@angular/core';
import { FormBuilder, FormGroup, Validators }                     from '@angular/forms';
import { Router }                                                 from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType }                from '@angular/common/http';

// Environtment
import { environment }                                            from '../../../../environments/environment';

// Service
import { MemberGetMemberService }                                 from './member-get-member.service';

// Library
declare var $: any;
import { BsModalService, BsModalRef }                             from 'ngx-bootstrap/modal';
import * as moment from 'moment';

// Shared Service
import { UploadFileService }                                      from '../../shared/service/upload-file.service';
import { SweetalertService }                                      from '../../shared/service/sweetalert.service';

@Component({
  selector: 'app-member-get-member-add',
  templateUrl: './pages/member-get-member-add.component.html',
  styleUrls: ['./pages/member-get-member-add.component.css']
})
export class MemberGetMemberAddComponent implements OnInit {
  
  minDate: Date = new Date()

  addMGM                  : FormGroup;
  image_url                         = environment.image_url
  prefix                  : String  = environment.prefix
  modalRef                : BsModalRef

  imgUrl                  : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  start_date  : String
  end_date    : String

  constructor(  private fb                    : FormBuilder,
                private router                : Router,
                private memberGetMemberService: MemberGetMemberService,
                private uploadFileService     : UploadFileService,
                private modalService          : BsModalService,
                private sweetalertService     : SweetalertService,) 
  { 
    this.createForm()
  }

  ngOnInit() {
  }

  public openModal(template: TemplateRef<any>) {
    if(this.date.value){
      let tgl = $('#start_date').val().split(" ")
      this.start_date  = moment(tgl[0]).format('DD-MM-YYYY')
      this.end_date    = moment(tgl[2]).format('DD-MM-YYYY')
    }

    this.modalRef = this.modalService.show(template);
  }

  public createMGM(){
    let date   = $('#start_date').val().split(" ")
    
    this.addMGM.patchValue({
      date      : date
    })

    return this.memberGetMemberService.saveMemberGetMember(this.addMGM.value)
                      .subscribe(() => {
                        this.sweetalertService.yourWorkHasBeenSaved('Member Get Member Has Been Save')
                        this.router.navigate([this.prefix + '/member-get-member'])
                      })
  }

  protected createForm(){
    this.addMGM = this.fb.group({
      maximum_amount            : ['',[Validators.required]],
      reward                    : ['',[Validators.required]],
      image                     : ['',[Validators.required]],
      date                      : ['']
    });
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
        this.addMGM.patchValue({ image : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  get date() {
    return this.addMGM.get('date')
  }
  get maximum_amount(){
    return this.addMGM.get('maximum_amount');
  }
  get reward(){
    return this.addMGM.get('reward');
  }
  get image(){
    return this.addMGM.get('image');
  }

}
