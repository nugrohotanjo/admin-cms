// Core
import { Injectable }               from '@angular/core';

// Model
import { PolicyProduct } from './policy-product';
import { PolicyMaster } from './policy-master';
import { PolicyPayment } from './policy-payment';
import { PolicyHolder } from './policy-holder';
import { PolicyInsured } from './policy-insured';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';
import { PolicyBeneficiary } from './policy-beneficiary';


@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private apiService        : ApiService) { }

  getPolicyById(id: String): Observable<PolicyMaster>{
    return this.apiService.get("/id-type/" + id)
                .pipe(map(data => data));
  }

  getPolicyProductByPolicyId(id: String): Observable<PolicyProduct>{
    return this.apiService.get("/policy-product/" + id)
                .pipe(map(data => data));
  }

  getPolicyProductsByPolicyId(id: String): Observable<Array<PolicyProduct>>{
    return this.apiService.get("/policy-product/" + id)
                .pipe(map(data => data));
  }

  getPolicyHolderByPolicyId(id: String): Observable<PolicyHolder>{
    return this.apiService.get("/policy-holder/" + id)
                .pipe(map(data => data));
  }

  getInsuredByPolicyId(id: String): Observable<Array<PolicyInsured>>{
    return this.apiService.get("/policy-insured/policy-all/" + id)
                .pipe(map(data => data));
  }

  getPolicyBeneficiaryByPolicyId(id: String): Observable<Array<PolicyBeneficiary>>{
    return this.apiService.get("/policy-beneficiary/policy/" + id)
                .pipe(map(data => data));
  }

  getPolicyPaymentByPolicyId(id: String): Observable<PolicyPayment>{
    return this.apiService.get("/policy-payment/policy/" + id)
                .pipe(map(data => data));
  }
}
