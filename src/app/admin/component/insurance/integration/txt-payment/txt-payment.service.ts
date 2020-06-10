// Core
import { Injectable }               from '@angular/core';

// Model
import { TxtPayment }               from './txt-payment';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TxtPaymentService {

  constructor(private apiService        : ApiService) { }

  public getTxtPayment(date : String): Observable<TxtPayment[]> {
    return this.apiService.get("/integration/txt/billing-renewal/" + date + "/" + date)
                .pipe(map(data => data));
  }

}
