import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Environtment
import { environment }                          from 'src/environments/environment';

// Service
import { ProductApprovalService }           from '../product-approval.service'
import { ProductBenefitService }            from '../../product-management/product-benefit/product-benefit.service'
import { ProductRateService }               from '../../product-management/product-rate/product-rate.service'
import { BenefitLevelService }              from '../../../master/benefit-level-management/benefit-level.service'
import { MasterSetupRateService }           from '../../../master/master-setup-rate/master-setup-rate.service'
import { ProductParameterizationService }   from '../../product-management/product-parameterization/product-parameterization.service'
import { ProductRiderService }              from '../../product-management/product-rider/product-rider.service'
import { ProductModalFactorService } from '../../product-management/product-modal-factor/product-modal-factor.service'
import { ProductPromoService } from '../../product-management/product-promo/product-promo.service'


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  prefix                  : String = environment.prefix

  ListBenefit                 : any       = []
  ListModalFactor             : any       = []
  ListMasterRate              : any       = []
  ListSelectedBenefit         : any       = []
  ListParameterize            : any       = []
  ListUnderwriting            : any       = []
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

  // get product id from parameters
  id      : String = this.route.snapshot.paramMap.get("id")
  category  = null
  Type      = null
  constructor(private route                     : ActivatedRoute,
              private router                    : Router,
              private productApprovalService    : ProductApprovalService,
              private masterSetupRateService    : MasterSetupRateService,
              private productBenefitService     : ProductBenefitService,
              private productRateService        : ProductRateService,
              private benefitLevelService       : BenefitLevelService,
              private productRiderService       : ProductRiderService,
              private ProductPromoService       : ProductPromoService,
              private productModalFactorService : ProductModalFactorService,
              private productParameterizationService : ProductParameterizationService
              ) { }

  ngOnInit() {
    // init value
    this.initValue()
  }

  private initValue() {

    const product = this.productApprovalService.getProductById(this.id).toPromise()

    product.then((data) => {
      this.product_data = data
      this.category = this.product_data.category_product.id
      this.Type = this.product_data.product_type
    })

    if(this.Type != 'rider') {
      // Init List Benefit Level
      const tempBenefit = this.benefitLevelService.getAll().toPromise()
      tempBenefit.then((data) => {
        this.ListBenefit = data
      })

      // Get Parameterize Data
      const parameterize = this.productParameterizationService.getProductParameterById(this.id).toPromise()

      parameterize.then((data) => {
        this.parameterize_data  = data

        this.parameterize_data.underwriting.map(data => {
          this.ListUnderwriting.push(data)
        }) // end push
      }) // end then

      
      // Get Product Modal Factor
      const modal_factor = this.productModalFactorService.getProductModalFactorByProductId(this.id).toPromise()

      modal_factor.then((data) => {
        this.ListModalFactor = data
      })

      // get Promotion data
      const promotion = this.ProductPromoService.getPromoByProductId(this.id).toPromise()

      promotion.then((data) => {
        this.ListPromotion = data
      })


    }

    product.then(() => {
      // // Init List Master Rate by category
      const masterSetup = this.masterSetupRateService.getMasterRateByCategory(this.category).toPromise()
      masterSetup.then((data) => {
        this.ListMasterRate = data
      })

      // // Get Product Rate
      const rate = this.productRateService.getRateById(this.id).toPromise()
      rate.then((data) => {
        console.log(data)
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

            if(c.formula.modal_factor) {
              this.ListModalFactor.map(data => {
                if(c.formula.modal_factor === data.id) 
                  c.formula.modal_factor = data.modal_factor
              })
            }

            this.rate_param_data.push(c)
            
          })

          let o = null
          
          this.rate_param_data.map(u => {
            o = Object.values(u.formula)
            this.ListRateBody.push(o)
          })
          

        })
      })
    })
    
    // // Get Product Benefit By Product id
    const benefit = this.productBenefitService.getProductBenefitById(this.id).toPromise()

    benefit.then((data) => {
      this.benefit_data = data
      this.benefit_data.map(data => {
        this.ListSelectedBenefit.push(data.benefit_id)
      })
    })

    // // get Rider
    const rider = this.productRiderService.getRiderByProductId(this.id).toPromise()

    rider.then((data) => {
      this.tempRider = data

      this.tempRider.map((x) => {
        this.rider_data.push(x.rider_id)
      })
      
    })


  }

  public reject() {
    const approved = this.productApprovalService.updateStatus(this.id,0).toPromise()

    approved.then(() => {
      this.router.navigate([this.prefix + '/product'])
    })
  }

  public approve() {
    const approved = this.productApprovalService.updateStatus(this.id,1).toPromise()

    approved.then(() => {
      this.router.navigate([this.prefix + '/product'])
    })
  }

}
