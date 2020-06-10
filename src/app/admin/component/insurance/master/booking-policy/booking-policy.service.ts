// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { BookingPolicy }                  from './booking-policy';

// Service
import { ApiService }               from '../../../../shared/service/api.service';
import { GetCurrentUserService }     from '../../../../shared/service/getCurrentUser.service'

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
import { Observable, throwError }                           from 'rxjs';

// Environtment
import { environment }                          from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingPolicyService {

  constructor(private apiService        : ApiService,
              private _http             : HttpClient,
              private getCurrentUserService : GetCurrentUserService) { }

  errorHandler(error: any){
    return throwError(error.error);
  }

  saveBookingPolicy(data,body: Array<BookingPolicy> = []) : Observable<BookingPolicy>{

    let user = this.getCurrentUserService.getUserData()

    let x = null // siapin dlu variablenya

    data.map(data => {

      x = {
        "core_booking_policy_number"  : data.core_booking_policy_number,
        "core_booking_policy_status"  : data.core_booking_policy_status,
        "agent_code"                  : data.agent_code,
        "inserted_by"                 : user.name,
        "updated_by"                  : user.name
      }
    
      body.push(x) // push datanya 
      
    })

    return this.apiService.post('/booking-policy/all', body)
                        .pipe(map(data => data));
      
  }

  amountBookingEpolicy() {
    return this.apiService.get("/booking-policy/count")
                        .pipe(map(data => data));
  }
  
}
