// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { ProductModalFactor }                  from './product-modal-factor';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
import { Observable }                           from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductModalFactorService {

  constructor(private apiService        : ApiService) { }

  saveProductModalFactor(data,product_id, body: Array<ProductModalFactor> = []) : Observable<ProductModalFactor>{

      let x = null // sediain dlu variablenya
      
      data.modal_factors.map(data => {
        x = {
          "modalFactor_id" :{
            "id" : data.modalFactor_id
          },
          "product_id" : {
            "id" : product_id
          },
          "value" : data.value,
          "payment_term_status" : data.payment_term_status ? 1 : 0
        }

        body.push(x) // push ke array jsonnya
      })
      
      return this.apiService.post("/product-modal-factor/all", body)
                  .pipe(map(data => data))
  }

  getProductModalFactorByProductId(id): Observable<ProductModalFactor>{
    return this.apiService.get("/products-modal-factor/" + id)
                .pipe(map(data => data));
  }

  destroyProductModalFactorByProductId(id): Observable<ProductModalFactor>{
    return this.apiService.delete("/products-modal-factor/product/" + id)
                .pipe(map(data => data));
  }
}
