import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';

// Model
import { ModalFactor } from '../../../master/modal-factor-management/modal-factor'

// Service
import { ModalFactorService } from '../../../master/modal-factor-management/modal-factor.service'
import { ProductModalFactorService } from './product-modal-factor.service'

// Environtment
import { environment }              from 'src/environments/environment';

@Component({
  selector: 'app-product-modal-factor',
  templateUrl: './product-modal-factor.component.html',
  styleUrls: ['./product-modal-factor.component.css']
})
export class ProductModalFactorComponent implements OnInit {


  dataUrl           : String  = environment.api_url
  prefix            : String  = environment.prefix

  modalFactorForm         : FormGroup
  ListModalFactor         : Array<ModalFactor> = []
  ListProductModalFactor  : any = []

  // get the type from parameters
  Type          : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category_id   : String = this.route.snapshot.paramMap.get('category');
  // get product id from parameters
  ProductId     : String  = this.route.snapshot.paramMap.get("product_id")

  constructor(  private route           : ActivatedRoute,
                private router          : Router,
                private cd              : ChangeDetectorRef,
                private fb              : FormBuilder,
                private modalFactorService : ModalFactorService,
                private productModalFactorService : ProductModalFactorService) { }

  ngOnInit() {
    this.createForm()
    this.initData()
  }

  private initData() {
    const modal_factor = this.modalFactorService.getAll().toPromise()
    modal_factor.then((data) => {
      this.ListModalFactor = data
    })
    
    const product_modal_factor = this.productModalFactorService.getProductModalFactorByProductId(this.ProductId).toPromise()
    
    product_modal_factor.then((data) => {
      this.ListProductModalFactor = data

        let x = null
        let z = []

        this.ListProductModalFactor.map((c) => {
          x = {
            "id"                  : c.modalFactor_id.id,
            "payment_term_status" : c.payment_term_status === 1 ? true : false,
            "value"               : c.value
          }
          z.push(x)
        })
        
        if(data[0] != undefined) {
          this.loadRow(z)
        } else {
          this.loadRow(this.ListModalFactor)
        }
    })
  }

  protected createForm() {
    this.modalFactorForm = this.fb.group({
      modal_factors        : new FormArray([])
    })
  }

  public saveProductModalFactor() {

    const delete_product_modal_factor = this.productModalFactorService.destroyProductModalFactorByProductId(this.ProductId).toPromise()

    delete_product_modal_factor.then(() => {
      const modal_factor = this.productModalFactorService.saveProductModalFactor(this.modalFactorForm.value,this.ProductId).toPromise()
    
      modal_factor.then(() => {

        if(this.Type === 'rider') {
          // Navigate to last step
          this.router.navigate([
            this.prefix + '/product/add/parameterize/' + 
            this.Type + '/' + 
            this.Category_id + '/' + 
            this.ProductId])
          
        } else {
          // Navigate to Forth step
          this.router.navigate([
            this.prefix + '/product/add/promo/' + 
            this.Type + '/' + 
            this.Category_id + '/' + 
            this.ProductId])
        }
        
      })
    })
    
  }

  public loadRow(data) {
      data.map((data,i) => {
        this.t.push(this.fb.group({
          modalFactor_id                : [data.id],
          product_id                    : [this.ProductId],
          value                         : [data.value],
          payment_term_status           : [data.payment_term_status]
        }));
  
        this.cd.detectChanges()
      })
  }

  get f()         { return this.modalFactorForm.controls; }
  get t()         { return this.f.modal_factors as FormArray; }
  get modal_factors()  { return this.modalFactorForm.get('modal_factors') }

}
