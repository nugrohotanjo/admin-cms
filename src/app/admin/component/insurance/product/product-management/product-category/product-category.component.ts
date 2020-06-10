// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit, Input }                    from '@angular/core';
import { Router, ActivatedRoute }                               from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment }                          from 'src/environments/environment';

// Service
import { ProductCategoryService }               from './product-category.service'
import { ProductCategoryService as CategoryService } from '../../product-category/product-category.service'
import { PaymentMethodSetupService }            from '../../../master/payment-method-management/payment-method-setup.service'
import { ProductApprovalService }               from '../../product-approval/product-approval.service'
import { CurrencyService }                      from '../../../master/currency/currency.service'
import { GetCurrentUserService }                from '../../../../../shared/service/getCurrentUser.service'
import { LogService }                           from '../../../../log-management/log.service'

// SharedService
import { SweetalertService }                    from '../../../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService }           from '../../../../../shared/service/dynamic-script.service';
import { UploadFileService }                    from 'src/app/admin/shared/service/upload-file.service';

// SharedPipe
import { SlugifyPipe }                          from '../../../../../shared/pipe/slugify.pipe'; 

// Model
import {ProductCategory}                        from '../../product-category/product-category'
import {PaymentMethodSetup}                     from '../../../master/payment-method-management/payment-method-setup'
import { Currency }                             from '../../../master/currency/currency'

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  addProduct              : FormGroup;
  image_url                         = environment.image_url
  prefix                  : String  = environment.prefix
  productId               : String = null;
  ListCategory            : ProductCategory[]
  ListPaymentMethodNew       : PaymentMethodSetup[]
  ListPaymentMethodRenewal   : PaymentMethodSetup[]
  ListCurrency                : Currency[]

  selectedLifeAssured : Boolean = false;
  selectedBeneficiary : Boolean = false;
  selectedPayment = []

  origin                        = null
  new_update                    = null

  // Rider icon
  rider_icon_image = null
  selectedFiles           : FileList
  currentFileUpload       : File
  progress                : { percentage  : number } = { percentage: 0 }

  // get the type from parameters
  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category_id  : String = this.route.snapshot.paramMap.get('category');
  // get product name from parameters
  ProductId      : String = this.route.snapshot.paramMap.get("product_id")

  constructor(  private fb                      : FormBuilder, 
                private router                  : Router,
                private productApprovalService  : ProductApprovalService,
                private route                   : ActivatedRoute,
                private sweetalertService       : SweetalertService,
                private productCategoryService  : ProductCategoryService,
                private paymentMethodService    : PaymentMethodSetupService,
                private slugifyPipe             : SlugifyPipe,
                private currencyService         : CurrencyService ,
                private categoryService         : CategoryService,
                private logService              : LogService,
                private uploadFileService       : UploadFileService,
                private getCurrentUserService   : GetCurrentUserService,
                private dynamicScriptLoader     : DynamicScriptLoaderService, ) { }

  ngOnInit() {    
    // Init Data
    this.initData()

    this.createForm()
    this.loadScripts()

  }

  public saveProduct(){

    const product = this.productCategoryService.saveProduct(this.addProduct.value).toPromise()

    product.then((data) => {
      this.productId = data.id

      const edited = this.productApprovalService.updateStatus(this.productId,0).toPromise()

      edited.then(() => {
        let user = this.getCurrentUserService.getUserData()
        let category = null
        let message = null

        if(this.ProductId)
          message   = "User " + user.name + " Edit Product Master with ID " + this.ProductId // set messagenya kalau dia update
        else 
          message   = "User " + user.name + " Add Product Master" // set messagenya kalau dia baru buat
          
        category  = "Product Creation" // set categorynya

        this.new_update = this.addProduct.value // update data yang barunya
        
        const log = this.logService.storeLog(user, category, message, this.origin, this.new_update).toPromise()

        log.then(() => {
          // Navigate to Second step
          this.router.navigate([
            this.prefix + '/product/add/rate/' + 
            this.product_type.value + '/' + 
            this.product_category.value + '/' + 
            this.productId])
        })
      })
    })
  }

  public toggleLifeAssured(){
    if(this.selectedLifeAssured){
      return this.selectedLifeAssured = false
    }else{
      return this.selectedLifeAssured = true
    }
  }

  public toggleBeneficiary() {
    if(this.selectedBeneficiary) {
      return this.selectedBeneficiary = false
    } else {
      return this.selectedBeneficiary = true
    }
  }

  private createForm(){
    this.addProduct = this.fb.group({
      id                                : [''],
      product_name                      : ['',  [Validators.required]],
      product_type                      : ['',  [Validators.required]],
      product_category                  : ['',  [Validators.required]],
      plan_name                         : [''],
      product_core_id                   : ['',  [Validators.required]],
      product_core_code                 : ['',  [Validators.required]],
      product_description               : ['',  [Validators.required]],
      product_general_description       : [''],
      payment_new_business              : ['',  [Validators.required]],
      payment_new_renewal               : ['',  [Validators.required]],
      currency                          : ['',  [Validators.required]],
      beneficiary                       : [''],
      beneficiaryValue                  : ['1'],
      lifeAssured                       : [''],
      lifeAssuredValue                  : ['1'],
      start_date                        : ['',  [Validators.required]],
      end_date                          : ['',  [Validators.required]],
      coverage_period                   : ['',  [Validators.required]],
      renewal_age                       : ['',  [Validators.required]],
      premium_payment_period            : ['',  [Validators.required]],
      rider_icon                        : [''],
    });
  }

  private initData(){

    if(this.ProductId) {
      this.productCategoryService.getProductById(this.ProductId)
                  .subscribe(data => {
                    this.loadProduct(data)
                    this.origin = data
                  })
    }

    // Get all List Category
    this.categoryService.getAll()
              .subscribe(data =>  this.ListCategory = data)

    // Get all Payment Method
    this.paymentMethodService.getAllNewBusiness()
              .subscribe(data => this.ListPaymentMethodNew = data)

    this.paymentMethodService.getAllRenewal()
              .subscribe(data => this.ListPaymentMethodRenewal = data)

    this.currencyService.getAll()
            .subscribe( data => this.ListCurrency = data)
  }

  private loadProduct(param) {
    this.addProduct.patchValue({
      id                    : param.id                        ? param.id : null,
      product_name          : param.product_name              ? param.product_name : null,
      product_type          : param.product_type              ? param.product_type : null,
      product_category      : param.category_product.id       ? param.category_product.id : null,
      plan_name             : param.name                      ? param.name : null,
      product_core_id       : param.product_core_id           ? param.product_core_id : null,
      product_core_code     : param.product_core_code         ? param.product_core_code : null,
      product_description   : param.description               ? param.description : null,
      product_general_description   : param.general_description               ? param.general_description : null,
      payment_new_business  : param.paymentBusiness           ? param.paymentBusiness : null,
      payment_new_renewal   : param.paymentRenewal            ? param.paymentRenewal : null,
      currency              : param.currency_product          ? param.currency_product.id : null,
      beneficiary           : param.multiple_beneficiary == "1" ? true : false,
      beneficiaryValue      : param.beneficiaryValue != null  ? param.beneficiaryValue : null,
      lifeAssured           : param.multiple_life_assured == "1" ? true : false,
      lifeAssuredValue      : param.multiple_life_assured_value != null ? param.multiple_life_assured_value : null,
      start_date            : param.start_date                ? param.start_date : null,
      end_date              : param.end_date                  ? param.end_date : null,
      coverage_period       : param.coverage_period           ? param.coverage_period : null,
      renewal_age           : param.renewal_age               ? param.renewal_age : null,
      premium_payment_period: param.premium_payment_period    ? param.premium_payment_period : null,
      rider_icon            : param.rider_icon                ? param.rider_icon : null,
    })

    // Set True Multiple Life Assured 
    param.multiple_life_assured == 1 ? this.selectedLifeAssured = true : false
    param.multiple_beneficiary  == 1 ? this.selectedBeneficiary = true : false

    // set image rider icon
    this.rider_icon_image = this.image_url + "" + param.rider_icon
  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/rider_icon', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.rider_icon_image = myObj.fileUrl
        this.addProduct.patchValue({ rider_icon : myObj.fileName })
      }
    })

    this.selectedFiles = undefined
  }

  get id(){
    return this.addProduct.get('id')
  }
  get product_name(){
    return this.addProduct.get('product_name')
  }
  get product_type(){
    return this.addProduct.get('product_type')
  }
  get product_category(){
    return this.addProduct.get('product_category')
  }
  get plan_name(){
    return this.addProduct.get('plan_name')
  }
  get product_core_id(){
    return this.addProduct.get('product_core_id')
  }
  get product_core_code(){
    return this.addProduct.get('product_core_code')
  }
  get currency(){
    return this.addProduct.get('currency')
  }
  get payment_new_business(){
    return this.addProduct.get('payment_new_business')
  }
  get payment_new_renewal(){
    return this.addProduct.get('payment_new_renewal')
  }
  get start_date(){
    return this.addProduct.get('start_date')
  }
  get end_date(){
    return this.addProduct.get('end_date')
  }
  get coverage_period(){
    return this.addProduct.get('coverage_period')
  }
  get renewal_age(){
    return this.addProduct.get('renewal_age')
  }
  get premium_payment_period(){
    return this.addProduct.get('premium_payment_period')
  }
  get product_general_description(){
    return this.addProduct.get('product_general_description')
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('Select2').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
}
