// Core
import { Injectable }               from '@angular/core';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor( private apiService : ApiService) { }

    getEpolicyDeliveryStatusToday(date) {
        return this.apiService.get("/report-epolicy-delivery/get-count-today/" + date)
                            .pipe(map(data => data));
    }

    getCtaStatusToday(date) {
      return this.apiService.get("/quotations/get-count-today/" + date)
                          .pipe(map(data => data));
    }

    getMgmCountToday() {
      return this.apiService.get("/member-get-member-submit/get-count-today")
                          .pipe(map(data => data));
    }

    getTransactionToday() {
      return this.apiService.get("/member-get-member-submit/get-count-today")
                          .pipe(map(data => data));
    }

    getAmountToday(date) {
      return this.apiService.get("/policy-payment/today-amount/" + date)
                          .pipe(map(data => data));
    }
}
