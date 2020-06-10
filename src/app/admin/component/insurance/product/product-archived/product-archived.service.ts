// Core
import { Injectable }               from '@angular/core';

// Model
import { ProductArchived }            from './product-archived'

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductArchivedService {

  constructor(private apiService        : ApiService) { }

    getProductById(id: String): Observable<ProductArchived> {
        return this.apiService.get("/product/" + id )
                    .pipe(map(data => data));
    }

    unarchived(id: String): Observable<ProductArchived> {
      
      return this.apiService.put("/product/status/delete/" + id + "/0")
                  .pipe(map(data => data));
    }

    // updateProductStatusById(id: String, status: String): Observable<ProductArchived> {
    //     return this.apiService.put("/product/status/" + id + "/ " + status + "/")
    //                 .pipe(map(data => data));
    // }
}
