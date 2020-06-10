// Core
import { Injectable }               from '@angular/core';
import { HttpClient }               from '@angular/common/http';

// Model
import { EpolicyDelivery }                      from './epolicy-delivery';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EpolicyDeliveryService {

  constructor(private apiService        : ApiService) { }

  getByPolicyNumber(id) {
    return this.apiService.get("/quotation/" + id)
                        .pipe(map(data => data));
  }

  getStatusToday(date) {
    return this.apiService.get("/report-epolicy-delivery/get-count-today/" + date)
                        .pipe(map(data => data));
  }
  
}
