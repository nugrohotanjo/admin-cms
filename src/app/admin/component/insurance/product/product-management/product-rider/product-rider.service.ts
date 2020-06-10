// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { ProductRider }                  from './product-rider';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

// Environtment
import { environment }                          from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductRiderService {

  constructor(private apiService        : ApiService,
              private _http             : HttpClient) { }

  getAllProductRider(){
    return this.apiService.get("/product/rider")
                .pipe(map(data => data));
  }

  saveProductRider(params, id, data: Object = {}) {
    params.riders.map((param) => {

      data = {
        product_id : {
          id : parseInt(id)
        },
        rider_id : {
          id : parseInt(param.id)
        }
      }
      console.log(data)
      return this._http.post(`${environment.api_url}/product-rider`, data).subscribe()
    })
  }

  getRiderByProductId(id): Observable<ProductRider>{
    return this.apiService.get("/products-rider/" + id)
                .pipe(map(data => data));
  }

  getProductRiderById(id: string): Observable<ProductRider>{
    return this.apiService.get("/category/" + id)
                .pipe(map(data => data));
  }

  destroyAllRiderByProductId(id): Observable<ProductRider>{
    return this.apiService.delete("/product-rider/product/" + id)
                .pipe(map(data => data));
  }
}
