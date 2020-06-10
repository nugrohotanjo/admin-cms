// Core
import { Injectable }                           from '@angular/core';

// Model
import { ProductBrochure }                      from './product-brochure';

// Service
import { ApiService }                           from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                                  from 'rxjs/operators';
import { Observable }                           from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFileService {

  constructor(private apiService        : ApiService) { }

  saveProductBrochure(data, id) : Observable<ProductBrochure>{
    console.log(data)
      let brochure = {
        id      : data.id,
        product_id    : {
          "id" : id
        },
        file_name     : data.brochure
      }
      console.log(brochure)
      if(brochure.id) {
        return this.apiService.put("/product-file/" + brochure.id, brochure)
                      .pipe(map(data => data))
      } else {
        return this.apiService.post("/product-file", brochure)
                    .pipe(map(data => data))
      }
      
  }

  getProductFileById(id): Observable<ProductBrochure>{
    return this.apiService.get("/products-file/" + id)
                .pipe(map(data => data));
  }

  getProductFileDataById(id): Observable<ProductBrochure>{
    return this.apiService.get("/products-file/" + id)
                .pipe(map(data => data));
  }
}
