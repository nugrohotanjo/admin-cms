// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { ProductBenefit }                  from './product-benefit';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
import { Observable, throwError }                           from 'rxjs';

// Environtment
import { environment }                          from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductBenefitService {

  constructor(private apiService        : ApiService,
              private _http             : HttpClient) { }

//   getAll(){
//     return this.apiService.get("/product-benefit")
//                   .pipe(map(data => data));
//   }

  errorHandler(error: any){
    return throwError(error.error);
  }

  saveProductBenefit(benefit_data, body: Array<ProductBenefit> = []) : Observable<ProductBenefit>{

      let x = null // sediain dlu variablenya

      benefit_data.map(data => {
        x = {
          "benefit_id" :{
            "id" : data.id
          },
          "product_id" : {
            "id" : data.product_id
          },
          "value" : data.value,
          "position" : data.position
        }

        body.push(x) // push ke array jsonnya
      })
      
      return this.apiService.post("/product-benefit", body)
                  .pipe(map(data => data))
    
  }

  getProductBenefitById(id): Observable<ProductBenefit>{
    return this.apiService.get("/products-benefit/" + id)
                .pipe(map(data => data));
  }

  destroyProductBenefit(id): Observable<ProductBenefit>{
    return this.apiService.delete("/product-benefit/product/" + id)
                .pipe(map(data => data));
  }
}
