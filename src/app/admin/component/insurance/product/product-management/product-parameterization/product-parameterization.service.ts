// Core
import { Injectable }               from '@angular/core';

// Model
import { ProductParameterization }      from './product-parameterization'

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductParameterizationService {

  constructor(private apiService        : ApiService) { }

  saveProductParam(param, product_id): Observable<ProductParameterization>{

    let data = {
        "id" : parseInt(param.id),
        "product_id" : {
            "id" : parseInt(product_id)
        },
        "underwriting"          : param.underwriting_questionnaire ? param.underwriting_questionnaire : null,
        "min_age"               : parseInt(param.min_age),
        "max_age"               : parseInt(param.max_age),
        "min_age_insured"       : parseInt(param.insured_min_age),
        "max_age_insured"       : parseInt(param.insured_max_age),
        "min_age_join_insured"  : parseInt(param.join_insured_min_age),
        "max_age_join_insured"  : parseInt(param.join_insured_max_age)
    }
    
    if(data.id){
      return this.apiService.put("/product-parameter/" + data.id , data)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/product-parameter", data)
                    .pipe(map(data => data));
    }
  }

  getProductParameterById(id): Observable<ProductParameterization>{
    return this.apiService.get("/products-parameter/" + id)
                .pipe(map(data => data));
  }

  destroyProductSetup(id: string): Observable<ProductParameterization>{
    return this.apiService.delete("/product-parameter/" + id)
                .pipe(map(data => data));
  }
}
