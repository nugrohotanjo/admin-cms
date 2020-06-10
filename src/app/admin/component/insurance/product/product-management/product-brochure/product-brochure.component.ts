// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute }                        from "@angular/router";

import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import Swal                                   from 'sweetalert2/dist/sweetalert2.js';
// Environtment
import { environment }                          from 'src/environments/environment';

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { UploadFileService }                    from '../../../../../shared/service/upload-file.service';

// Service
import { ProductFileService } from './product-brochure.service'

@Component({
  selector: 'app-product-brochure',
  templateUrl: './product-brochure.component.html',
  styleUrls: ['./product-brochure.component.css']
})
export class ProductBrochureComponent implements OnInit {

  brochureForm               : FormGroup
  image_url                     = environment.image_url
  prefix                  : String  = environment.prefix

  file_pdf                : any = null
  selectedFiles           : any = null
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }
  tempEvent                     = null

  // get the type from parameters
  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category  : String = this.route.snapshot.paramMap.get('category');
  // get product name from parameters
  Id      : String = this.route.snapshot.paramMap.get("product_id")

  constructor(private fb                      : FormBuilder, 
              private uploadFileService       : UploadFileService,
              private productFileService      : ProductFileService, 
              private router                  : Router,
              private route                   : ActivatedRoute,
              private sweetalertService       : SweetalertService, ) { }

  ngOnInit() {
    this.createForm()
    this.initData()
  }

  private createForm(){
    this.brochureForm = this.fb.group({
      id            : [''],
      brochure      : ['', [Validators.required]]
    });
  }

  public selectFile(event) {
    this.file_pdf = event.target.files.item(0)
  }

  public addBrochure() {
    if(this.file_pdf != null) {
      this.uploadFileService.pushFileToStorage(this.file_pdf, '/brochure', 'file').subscribe(event => {
        this.tempEvent = event
        
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        }
  
        if(this.tempEvent.body != null) {
          let response = JSON.parse(this.tempEvent.body)
          
          this.brochureForm.patchValue({
            brochure : response.fileName
          })
  
        }
      }, err => console.log(err),
        () => {
          this.postDataBrochure()
        }
      )
    } else {
      if(this.selectFile != null) {
        this.navigateToExclusion()
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Please Upload the Brochure!'
        })
      }
    }
    
  }

  private postDataBrochure() {
    this.productFileService.saveProductBrochure(this.brochureForm.value,this.Id).subscribe(() => {
      this.navigateToExclusion()
    })
  }

  private initData() {
    this.productFileService.getProductFileById(this.Id).subscribe((data) => {
      this.selectedFiles = data[0].file_name
    })

    this.productFileService.getProductFileDataById(this.Id).subscribe((data) => {
      this.brochureForm.patchValue({
        id : data[0].id,
        brochure : data[0].file_name
      })
    })
  }

  private navigateToExclusion() {
    // Navigate to Step 9
    this.router.navigate([
      this.prefix     + '/product/add/exclusion/' + 
      this.Type       + '/' + 
      this.Category   + '/' + 
      this.Id])
  }

}
