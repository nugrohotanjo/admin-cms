// Core
import { Injectable }               from '@angular/core';

// Model
import { Claim }                    from './claim';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  constructor(private apiService        : ApiService) { }

  getClaimById(id: string): Observable<Claim>{
    return this.apiService.get("/claim/" + id)
                .pipe(map(data => data));
  }

  getClaimReport(start_date, end_date) {
    return this.apiService.get("/claim-excel-date-range/" + start_date + "/" + end_date)
                .pipe(map(data => data));
  }

  sendDecisionClaim(id_claim, action) {

    let claimDecision = {
      decision    : action.decision,
      reason      : action.reason,
    }

    return this.apiService.post("/claim/decision/" + id_claim, claimDecision)
                .pipe(map(data => data));
  }
}
