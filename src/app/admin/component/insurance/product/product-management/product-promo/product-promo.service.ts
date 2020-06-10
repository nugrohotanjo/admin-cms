// Core
import { Injectable }               from '@angular/core';

// Model
import { ProductPromo }                  from './product-promo';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductPromoService {

  constructor(private apiService        : ApiService) { }

  saveProductPromo(data,id, body: Array<ProductPromo> = []) : Observable<ProductPromo>{

    let x = null // sediain dlu variablenya

    data.promotions.map(data => {
      x = {
        "product_id" : {
          "id" : parseInt(id)
        },
        "promo_code_id" : {
          "id" : parseInt(data.id)
        }
      }

      body.push(x) // push ke array jsonnya
    })
    console.log(body)
    return this.apiService.post("/product-promo", body)
                .pipe(map(data => data))
  
}

  getPromoByProductId(id): Observable<ProductPromo>{
    return this.apiService.get("/products-promo/" + id)
                .pipe(map(data => data));
  }

  destroyAllPromoByProductId(id): Observable<ProductPromo>{
    return this.apiService.delete("/products-promo/" + id)
                .pipe(map(data => data));
  }
}
