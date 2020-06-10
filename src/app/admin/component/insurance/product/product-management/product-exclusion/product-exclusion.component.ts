// Core
import { Component, OnInit }                  from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute }             from "@angular/router";

// Environtment
import { environment }                          from 'src/environments/environment';
declare var $: any;

// Service
import { ProductExclusionService }                  from './product-exclusion.service';
import { DynamicScriptLoaderService }         from '../../../../../shared/service/dynamic-script.service';

// Shared Service
import { SweetalertService }                  from '../../../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-product-exclusion',
  templateUrl: './product-exclusion.component.html',
  styleUrls: ['./product-exclusion.component.css']
})
export class ProductExclusionComponent implements OnInit {

  exclusionForm       : FormGroup
  prefix             : String  = environment.prefix

  // get the type from parameters
  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category  : String = this.route.snapshot.paramMap.get('category');
  // get product name from parameters
  Id      : String = this.route.snapshot.paramMap.get("product_id")

  public editorConfig = {
    height    : '400px',
    minHeight : '500px',
    width     : '100%'
  };

  constructor(private productExclusionService : ProductExclusionService,
              private router                  : Router,
              private route                   : ActivatedRoute,
              private sweetalertService       : SweetalertService,
              private dynamicScriptLoader               : DynamicScriptLoaderService,
              private fb : FormBuilder) { }

  ngOnInit() {
    this.createForm()
    this.initData()
    this.loadScripts()
    console.log(this.Id)
  }

  public addExclusion(){
    return this.productExclusionService.saveProductExclusion(this.exclusionForm.value, this.Id)
                      .subscribe(() => {
                        // Navigate to Step 9
                        this.router.navigate([
                          this.prefix     + '/product/add/summary/' + 
                          this.Type       + '/' + 
                          this.Category   + '/' + 
                          this.Id])
                      })
  }

  private createForm() {
    this.exclusionForm = this.fb.group({
      id            : null,
      product_id    : [''],
      text          : ['',[Validators.required]]
    })
  }

  private initData() {
    this.productExclusionService.getExclusionById(this.Id).subscribe((data) => {
      if(data != null) {
        this.exclusionForm.patchValue({
          id          : data.id,
          product_id  : data.product_id.id,
          text        : data.text
        })
      }
    })
  }

  get id() {
    return this.exclusionForm.get('id')
  }
  get text() {
    return this.exclusionForm.get('text')
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('Summernote').then(data => {
      // Script Loaded Successfully
      // $('.summernote').summernote({
      //   height:'230px',
      //   focus:true,
      //   toolbar: [
      //       ['style', ['bold', 'italic', 'underline', 'clear']],
      //       ['fontsize', ['fontsize']],
      //       ['para', ['ul', 'ol', 'paragraph']],
      //       ['table', ['table']],
      //       ['misc', ['fullscreen','undo','redo']]
      //   ]
      // });
    }).catch(error => console.log(error));
  }

}
