// Core
import { Injectable }                           from '@angular/core';

// Model
import { Exclusion }                      from './product-exclusion';

// Service
import { ApiService }                           from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                                  from 'rxjs/operators';
import { Observable }                           from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductExclusionService {

  constructor(private apiService        : ApiService) { }

  saveProductExclusion(data, id) : Observable<Exclusion>{
    
      let exclusion = {
        "id" : data.id,
        "product_id" : {
          "id" : id
        },
        "text" : data.text
      }
      
      if(exclusion.id != null) {
        return this.apiService.put("/product-exclusion/" + exclusion.id, exclusion)
            .pipe(map(data => data))
      } else {
        return this.apiService.post("/product-exclusion", exclusion)
            .pipe(map(data => data))
      }
      
  }

  getExclusionById(id): Observable<Exclusion>{
    return this.apiService.get("/products-exclusion/" + id)
                .pipe(map(data => data));
  }
}
