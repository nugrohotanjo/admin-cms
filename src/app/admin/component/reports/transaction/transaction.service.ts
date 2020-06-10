// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { Transaction }                  from './transaction';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private apiService        : ApiService) { }

  getTransactionById(id): Observable<Transaction> {
    return this.apiService.get("/policy-master/" + id)
                        .pipe(map(data => data));
  }

  getTransactionByPolicyNumber(policy_number) {
    return this.apiService.get("/policy-master/transaction/" + policy_number)
                        .pipe(map(data => data));
  }

  downloadEpolicy(policy_number) {
    return this.apiService.get("/policy-master/epolicy/download/" + policy_number)
                        .pipe(map(data => data));
  }
  
}
