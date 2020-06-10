// Core
import { Injectable }               from '@angular/core';

// Model
import {ProductApproval} from './product-approval'

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductApprovalService {

  constructor(private apiService        : ApiService) { }

    getProductById(id: String): Observable<ProductApproval>{
        return this.apiService.get("/product/" + id )
                    .pipe(map(data => data));
    }

    updateStatus(id: String, status: Number): Observable<ProductApproval>{
      return this.apiService.put("/product/status/" + id + "/" + status)
                  .pipe(map(data => data));
    }

    updateProductStatusById(id: String, status: String): Observable<ProductApproval>{
        return this.apiService.put("/product/status/" + id + "/ " + status + "/")
                    .pipe(map(data => data));
    }
}
