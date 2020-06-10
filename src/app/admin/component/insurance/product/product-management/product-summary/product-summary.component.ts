import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Environtment
import { environment }                          from 'src/environments/environment';

// pipe
import  {KeysPipe}  from '../../../../../shared/pipe/keys.pipe'

// Service
import { ProductManagementService } from '../product-management.service'
import { ProductBenefitService } from '../product-benefit/product-benefit.service'
import { ProductRateService } from '../product-rate/product-rate.service'
import { BenefitLevelService } from '../../../master/benefit-level-management/benefit-level.service'
import { ModalFactorService } from '../../../master/modal-factor-management/modal-factor.service'
import { MasterSetupRateService } from '../../../master/master-setup-rate/master-setup-rate.service'
import { ProductParameterizationService } from '../product-parameterization/product-parameterization.service'
import { ProductRiderService } from '../product-rider/product-rider.service'
import { ProductModalFactorService } from '../product-modal-factor/product-modal-factor.service'
import { ProductPromoService } from '../../product-management/product-promo/product-promo.service'

@Component({
  selector: 'app-product-summary',
  templateUrl: './product-summary.component.html',
  styleUrls: ['./product-summary.component.css']
})
export class ProductSummaryComponent implements OnInit {

  prefix                  : String = environment.prefix

  ListBenefit                 : any       = []
  ListMasterRate              : any       = []
  ListModalFactor             : any       = []
  ListSelectedBenefit         : any       = []
  ListParameterize            : any       = {}
  ListUnderwriting            : any       = []
  ListTempUnderwriting        : any       = []
  ListPromotion               : any       = []

  ListRateHead                : any       = []
  ListRateBody                : any       = []

  product_data                : any       = []
  benefit_data : any                      = []
  rate_data  : any                        = []
  rate_param_data             : any       = []

  tempRider                   : any = []
  rider_data                  : any = []

  parameterize_data                 = null

  // get the type from parameters
  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category  : String = this.route.snapshot.paramMap.get('category');
  // get product id from parameters
  Id      : String = this.route.snapshot.paramMap.get("product_id")

  constructor(private route                     : ActivatedRoute,
              private router                    : Router,
              private productManagementService  : ProductManagementService,
              private masterSetupRateService    : MasterSetupRateService,
              private productBenefitService     : ProductBenefitService,
              private productRateService        : ProductRateService,
              private benefitLevelService       : BenefitLevelService,
              private modalFactorService        : ModalFactorService,
              private productRiderService       : ProductRiderService,
              private productPromoService       : ProductPromoService,
              private productModalFactorService : ProductModalFactorService,
              private productParameterizationService : ProductParameterizationService) { }

  ngOnInit() {
    // init value
    this.initValue()
  }

  private initValue() {

    // Init List Benefit Level
    const tempBenefit = this.benefitLevelService.getAll().toPromise()
    tempBenefit.then((data) => {
      this.ListBenefit = data
    })

    // Init value
    const product = this.productManagementService.getProductById(this.Id)
            .toPromise()

    product.then((data) => {
      this.product_data = data
      console.log(this.product_data)
    })

    // Init List Master Rate by category
    const masterSetup = this.masterSetupRateService.getMasterRateByCategory(this.Category).toPromise()
    masterSetup.then((data) => {
      if(this.Type != 'rider') {
        this.ListMasterRate = data
      }
      
    })

    // Get Product Rate
    const rate = this.productRateService.getRateById(this.Id).toPromise()
    rate.then((data) => {
      this.rate_data = data[0]
    })

    rate.then(() => {
      // Get Product Rate Param
      const rate_param = this.productRateService.getRateParamByRateId(this.rate_data.id).toPromise()
      rate_param.then(data => {
        let x = null
        x = data
        
        // console.log(x)

        x.map(data => {
          let c = JSON.parse(data.param_value)
          
          if(c.formula.benefit_level) {
            this.ListBenefit.map(data => {
              if(c.formula.benefit_level === data.id) 
                c.formula.benefit_level = data.benefit_level
            })
          }

          this.rate_param_data.push(c)
          
        })

        let o = null
        
        this.rate_param_data.map(u => {
          o = Object.values(u.formula)
          this.ListRateBody.push(o)
        })
        

        // console.log(this.ListRateBody)

      })
    })

    // Get Product Modal Factor
    const modal_factor = this.productModalFactorService.getProductModalFactorByProductId(this.Id).toPromise()

    modal_factor.then((data) => {
      this.ListModalFactor = data
    })

    // Get Product Benefit By Product id
    const benefit = this.productBenefitService.getProductBenefitById(this.Id).toPromise()

    benefit.then((data) => {
      this.benefit_data = data
      this.benefit_data.map(data => {
        this.ListSelectedBenefit.push(data.benefit_id)
      })
    })

    // get Rider
    const rider = this.productRiderService.getRiderByProductId(this.Id).toPromise()

    rider.then((data) => {
      this.tempRider = data

      this.tempRider.map((x) => {
        this.rider_data.push(x.rider_id)
      })
      
    })

    // Get Parameterize Data
    const parameterize = this.productParameterizationService.getProductParameterById(this.Id).toPromise()

    parameterize.then((data) => {
      this.parameterize_data  = {
        min_age : data.min_age,
        max_age : data.max_age,
        min_age_insured : data.min_age_insured,
        max_age_insured : data.max_age_insured,
        min_age_join_insured : data.min_age_join_insured,
        max_age_join_insured : data.max_age_join_insured
      }

      this.ListTempUnderwriting = data.underwriting // taro di variable dlu, gak mau direct dia

      this.ListTempUnderwriting.map(data => {
        this.ListUnderwriting.push(data) // looping datanya
      })

      
    })

    // get Promotion data
    const promotion = this.productPromoService.getPromoByProductId(this.Id).toPromise()

    promotion.then((data) => {
      this.ListPromotion = data
    })

    

  }

  public saveForApproval() {
    // Navigate to Third step
    this.router.navigate([this.prefix + '/product'])
  }

}
