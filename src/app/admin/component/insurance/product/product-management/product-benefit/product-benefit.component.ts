import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

// Service
import { BenefitService } from '../../../master/benefit-management/benefit.service'
import { ProductCategoryService }  from '../product-category/product-category.service'
import { ProductBenefitService } from './product-benefit.service'

// Environtment
import { environment }              from 'src/environments/environment';

@Component({
  selector: 'app-product-benefit',
  templateUrl: './product-benefit.component.html',
  styleUrls: ['./product-benefit.component.css']
})
export class ProductBenefitComponent implements OnInit {

  dataUrl           : String  = environment.api_url
  prefix            : String  = environment.prefix
  ListBenefit = []
  BenefitForm : FormGroup
  product     = null
  BenefitData = []
  ListBenefitSelected = null

  // get the type from parameters
  Type          : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category_id   : String = this.route.snapshot.paramMap.get('category');
  // get product id from parameters
  ProductId     : String  = this.route.snapshot.paramMap.get("product_id")

  constructor(private benefitService : BenefitService,
              private route           : ActivatedRoute,
              private router          : Router,
              private cd              : ChangeDetectorRef,
              private fb              : FormBuilder,
              private productBenefitService : ProductBenefitService,
              private productCategoryService : ProductCategoryService) { }

  ngOnInit() {
    this.createForm()

    // Get all value first
    this.initData()

    // console.log(this.t)

  }

  public saveProductBenefit() {
    // Dibedah dulu supaya id nya integer, dia gak bisa string
    let x = {};
    this.BenefitForm.value.benefits.map(data => {
      x = {
        "id"          : parseInt(data.id),
        "product_id"  : parseInt(data.product_id),
        "value"       : data.value,
        "position"    : data.position
      }
      this.BenefitData.push(x)
    })

    let delete_benefit = this.productBenefitService.destroyProductBenefit(this.ProductId).toPromise()
    
    delete_benefit.then(() => {
      let benefit = this.productBenefitService.saveProductBenefit(this.BenefitData).toPromise()

      benefit.then(() => {
        // Navigate to Second step
        this.router.navigate([
          this.prefix + '/product/add/rider/' + 
          this.Type + '/' + 
          this.Category_id + '/' + 
          this.ProductId])
      })
    })

    
  }

  protected createForm() {
    this.BenefitForm = this.fb.group({
      benefits        : new FormArray([])
    })
  }

  private initData() {
    // Init Product
    const lah = this.productBenefitService.getProductBenefitById(this.ProductId).toPromise()

    lah.then((data) => {
      this.ListBenefitSelected = data
    })
    .then(() => {
      this.benefitService.getAll()
      .subscribe(data => {
            this.ListBenefit = data
            
            if(this.ListBenefitSelected === undefined) 
              this.loadRow();
            else 
              this.loadRow(this.ListBenefitSelected)
            
      })
    }).finally()


  }

  public loadRow(data = null) {
    if(data != null && data.length > 0) {
      data.map((data,i) => {
        this.t.push(this.fb.group({
          id              : [data.benefit_id.id],
          product_id      : [this.ProductId],
          value           : [data.value],
          position        : [data.position]
        }));

        this.cd.detectChanges()
      })
    } else {
      this.t.push(this.fb.group({
        id              : [''],
        product_id      : [this.ProductId],
        value           : [''],
        position        : ['']
      }));
    }
    
  }

  public addRow() {
    this.t.push(this.fb.group({
      id              : [''],
      product_id      : [this.ProductId],
      value           : [''],
      position        : ['']
    }));
  }

  public removeRow() {
    let i = this.t.length
    this.t.removeAt(i - 1);
  }

  get f()         { return this.BenefitForm.controls; }
  get t()         { return this.f.benefits as FormArray; }
  get benefits()  { return this.BenefitForm.get('benefits') }

}
