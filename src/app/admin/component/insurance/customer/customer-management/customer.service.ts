// Core
import { Injectable }               from '@angular/core';

// Model
import { Customer }                    from './customer';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/customer")
                  .pipe(map(data => data));
  }

  getCustomerById(id: string): Observable<Customer>{
    return this.apiService.get("/customer/" + id)
                .pipe(map(data => data));
  }
}
