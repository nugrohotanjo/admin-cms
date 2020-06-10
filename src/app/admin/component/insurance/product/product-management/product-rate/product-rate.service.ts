// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { ProductManagementRate }      from './product-rate'

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Environtment
import { environment }                          from 'src/environments/environment';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductRateService {

  constructor(private apiService        : ApiService, 
              private _http             : HttpClient) { }

  saveProductRate(param, id): Observable<ProductManagementRate>{
    
    let data = {
      "id"                          : param.id ? parseInt(param.id) : null,
      "product_id" : {
                "id" : parseInt(id)
      },
      "formula_id"						      : {
                "id" : param.formula ? parseInt(param.formula) : null
        }
    }
    
    
    if(data.id){
      return this.apiService.put("/product-rate/" + data.id , data)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/product-rate", data)
                    .pipe(map(data => data));
    }
  }

  saveProductRateParam(params, id, data: Array<ProductManagementRate> = []) : Observable<ProductManagementRate>{
    let x     = null;
    let y     = null; // siapin variablenya

    params.map((param) => {
      x = '{ "formula" : ' + JSON.stringify(param) + ' }'
      console.log(param.gender)
      y = {
        rate_id			: {
          id			: parseInt(id)
        },
        age				: parseInt(param.age),
        param_value		: x,
        param_premi		: parseInt(param.value),
        gender		    : param.gender == "unrelated" ? null : param.gender,
        start_date		: param.start_date,
        end_date			: param.end_date
      }
      
      data.push(y)
    })

    return this.apiService.post('/product-rate-param/all', data)
                .pipe(map(data => data));
  }

  getRateById(id): Observable<ProductManagementRate>{
    return this.apiService.get("/product-rates/" + id)
                .pipe(map(data => data));
  }

  getRateParamByRateId(id): Observable<ProductManagementRate>{
    return this.apiService.get("/product-rate-param/product-rate/" + id)
                .pipe(map(data => data));
  }

  deleteAllRateParam(id): Observable<ProductManagementRate> {
    return this.apiService.delete("/product-rate-param/rate/" + id)
              .pipe(map(data => data));
  }

  destroyRate(id): Observable<ProductManagementRate>{
    return this.apiService.delete("/product/" + id)
                .pipe(map(data => data));
  }
}
