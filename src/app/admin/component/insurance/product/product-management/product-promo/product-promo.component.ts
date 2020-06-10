import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute }               from "@angular/router";
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';

// // Environtment
import { environment }   from 'src/environments/environment';

// // Model
import { ProductPromo } from './product-promo'

// // Service
import { ProductPromoService } from './product-promo.service'
import { CampaignService } from '../../../../campaign-management/campaign.service'


@Component({
  selector: 'app-product-promo',
  templateUrl: './product-promo.component.html',
  styleUrls: ['./product-promo.component.css']
})
export class ProductPromoComponent implements OnInit {

  addPromoForm            : FormGroup;
  prefix                  : String = environment.prefix

  ListPromotion           : any = []
  tempPromo               : any = []
  promo_data              : any = []

  Type      : String = this.route.snapshot.paramMap.get('type');
  // get the category from parameters
  Category_id  : String = this.route.snapshot.paramMap.get('category');
  // get product name from parameters
  Id      : String = this.route.snapshot.paramMap.get("product_id")

  constructor(  private productPromoService : ProductPromoService,
                private campaignService         : CampaignService,
                private router                  : Router,
                private fb                      : FormBuilder,
                private route                   : ActivatedRoute,
                ) { }

  ngOnInit() {
    this.createForm()
    this.initData()
  }

  private createForm() {
    this.addPromoForm = this.fb.group({
      promotions : ['']
    })
  }

  private initData() {
    const promoList = this.campaignService.getAll().toPromise()

    promoList.then((data) => {
      this.ListPromotion = data
    })

    // init data promonya
    const promo = this.productPromoService.getPromoByProductId(this.Id).toPromise()

    promo.then((data) => {
      this.tempPromo = data
      
      this.tempPromo.map((x) => {
        this.promo_data.push(x.promo_code_id)
      })
    })

    promo.then(() => {
      this.addPromoForm.patchValue({
        promotions : this.promo_data
      })
    })
  }

  public saveProductPromo() {

    const delete_promo = this.productPromoService.destroyAllPromoByProductId(this.Id).toPromise()

    delete_promo.then(() => {
      const promo = this.productPromoService.saveProductPromo(this.addPromoForm.value,this.Id).toPromise()

      promo.then(() => {

        // Navigate to Five step
        this.router.navigate([
          this.prefix + '/product/add/benefit/' + 
          this.Type + '/' + 
          this.Category_id + '/' + 
          this.Id])
      })
    })
    
    
  }

}
