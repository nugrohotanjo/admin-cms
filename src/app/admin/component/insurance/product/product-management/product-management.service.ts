// Core
import { Injectable }               from '@angular/core';

// Model
// import { ProductManagementRate }      from './product-rate'

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  constructor(private apiService : ApiService) { }

  getProductById(id: any){
    return this.apiService.get("/product/" + id)
                .pipe(map(data => data));
  }

  getProductBySlug(slug) {
    return this.apiService.get("/product/plan/" + slug)
                .pipe(map(data => data));
  }

  getProductByCoreCode(core_code) {
    return this.apiService.get("/product/code/" + core_code)
                .pipe(map(data => data));
  }

//   saveProduct(param): Observable<ProductManagementRate>{
    
//     let data = {
//       "id"                        : param.id,
//       "name"						          : param.plan_name,
//       "description"				        : param.product_description,	
//       "product_core_code"			    : param.product_core_code,
//       "product_core_id"			      : param.product_core_id,
//       "multiple_beneficiary"		  : param.beneficiary ? 1 : 0,
//       "multiple_life_assured"		  : param.life_assured ? 1 : 0,
//         "paymentBusiness"			    : param.payment_new_business,
//         "paymentRenewal"			    : param.payment_new_renewal,
//       "product_name"				      : param.product_name,
//       "product_status"			      : 0,
//       "product_type"				      : param.product_type,
//       "category_product"			    : {
//         "id"				              : param.product_category
//       }
//     }
    
//     if(data.id){
//       return this.apiService.put("/product/" + data.id , data)
//                     .pipe(map(data => data));
//     }else{
//       return this.apiService.post("/product", data)
//                     .pipe(map(data => data));
//     }
//   }

//   getRateById(id: String): Observable<ProductManagementRate>{
//     return this.apiService.get("/product/" + id)
//                 .pipe(map(data => data));
//   }

//   destroyRiderSetup(id: String): Observable<ProductManagementRate>{
//     return this.apiService.delete("/product/" + id)
//                 .pipe(map(data => data));
//   }

  archivedProduct(id) {
    return this.apiService.put("/product/status/delete/" + id + "/1")
              .pipe(map(data => data));
  }

  getPremi(params, rate_id, product_id) {

    let data = {
      input : params.param_premi,
      age	  : params.age
    }

    return this.apiService.post("/calculation/" + product_id + "/" + rate_id, data)
                .pipe(map(data => data));
  }
}
