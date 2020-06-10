// Core
import { Injectable }               from '@angular/core';

// Model
import { ProductManagementCategory }      from './productManagementCategory'

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

// SharedPipe
import { SlugifyPipe }              from '../../../../../shared/pipe/slugify.pipe'; 

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private apiService        : ApiService,
              private slugifyPipe       : SlugifyPipe) { }

  saveProduct(param): Observable<ProductManagementCategory>{
    
    let data = {
      id                        : param.id,
      name						          : param.plan_name,
      description				        : param.product_description,	
      general_description				: param.product_description,	
      product_core_code			    : param.product_core_code,
      product_core_id			      : param.product_core_id,
      multiple_beneficiary		  : param.beneficiary ? 1 : 0,
      multiple_life_assured		  : param.lifeAssured ? 1 : 0,
      multiple_life_assured_value : param.lifeAssuredValue ? parseInt(param.lifeAssuredValue) : null,
        paymentBusiness			    : param.payment_new_business,
        paymentRenewal			    : param.payment_new_renewal,
      product_name				      : param.product_name,
      slug                      : this.slugifyPipe.transform(param.product_name),
      product_status			      : 0,
      start_date			          : param.start_date,
      end_date			            : param.end_date,
      product_type				      : param.product_type,
      currency_product				  : {
        id                      : parseInt(param.currency)
      },
      category_product			    : {
        id				              : parseInt(param.product_category)
      },
      product_status_delete     : 0,
      coverage_period           : param.coverage_period,
      renewal_age               : param.renewal_age,
      premium_payment_period    : param.premium_payment_period,
      beneficiaryValue          : param.beneficiaryValue,
      rider_icon                : param.rider_icon
    }
    
    if(data.id){
      return this.apiService.put("/product/" + data.id , data)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/product", data)
                    .pipe(map(data => data));
    }
  }

  getProductById(id): Observable<ProductManagementCategory>{
    return this.apiService.get("/product/" + id)
                .pipe(map(data => data));
  }

  destroyProductSetup(id: string): Observable<ProductManagementCategory>{
    return this.apiService.delete("/product/" + id)
                .pipe(map(data => data));
  }
}
