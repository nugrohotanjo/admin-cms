// Core
import { Injectable }               from '@angular/core';

// Model
import { IntegrationPolicyMaster }                    from './integration-policy-master';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

// Model
import { PolicyMaster } from 'src/app/admin/component/insurance/policy/policy-management/policy-master';

// Service

@Injectable({
  providedIn: 'root'
})
export class IntegrationPolicyMasterService {

  constructor(private apiService        : ApiService) { }

  public getTxtMaster(date : String): Observable<PolicyMaster[]> {
    return this.apiService.get("/policy-master/txt/master/" + date + "/" + date)
                .pipe(map(data => data));
  }

  public getTxtCoverage(date : String) {
    return this.apiService.get("/policy-master/txt/coverage/" + date + "/" + date)
                .pipe(map(data => data));
  }

  public getTxtBeneficiary(date : String) {
    return this.apiService.get("/policy-master/txt/benef/" + date + "/" + date)
                .pipe(map(data => data));
  }

}
