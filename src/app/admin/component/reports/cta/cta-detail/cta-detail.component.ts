import { Component, OnInit } from '@angular/core';

// Service
import { CtaService } from '../cta.service'
import { ProductManagementService } from '../../../insurance/product/product-management/product-management.service'
import { ProductFileService } from '../../../insurance/product/product-management/product-brochure/product-brochure.service'
import { ActivatedRoute } from '@angular/router';

// Environtment
import { environment }       from 'src/environments/environment'

@Component({
  selector: 'app-cta-detail',
  templateUrl: './cta-detail.component.html',
  styleUrls: ['./cta-detail.component.css']
})
export class CtaDetailComponent implements OnInit {

  CtaDetail : any = null
  Product   : any = null
  Brochure  : any = null

  id      : String = this.route.snapshot.paramMap.get("id")

  prefix    = environment.prefix
  file_pdf  = environment.files

  search_query = null;

  constructor(private ctaService                : CtaService,
              private route                     : ActivatedRoute,
              private productManagementService  : ProductManagementService,
              private productFileService        : ProductFileService) { }

  ngOnInit() {
    this.initData()
  }

  private initData() {
    this.ctaService.getCtaById(this.id)
            .subscribe((data) => {
              this.CtaDetail = data
              this.search_query = (data.search_query != null) ? this.json2array(JSON.parse(data.search_query)) : null;
            }, err => console.log(err),
              () => {
                this.getProductById(this.CtaDetail.product_core_code)
              }
            )
  }

  private getProductById(id) {
    this.productManagementService.getProductByCoreCode(id)
              .subscribe((data) => {
                this.Product = data
              }, err => console.log(err),
                () => {
                  this.getBrochureByProduct(this.Product.id)
                }
              )
  }

  private getBrochureByProduct(id) {
    this.productFileService.getProductFileById(id)
              .subscribe((data) => {
                this.Brochure = data[0]
              })
  }

  private json2array(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        let json_key    = key;
        let json_value  = json[key];

        let object = {
          "key" : json_key,
          "value" : json_value
        }

        result.push(object);
    });
    return result;
}

}
