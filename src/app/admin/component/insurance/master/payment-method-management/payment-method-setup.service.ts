// Core
import { Injectable }               from '@angular/core';

// Model
import { PaymentMethodSetup }      from './payment-method-setup';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodSetupService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/payment-method-setup")
                  .pipe(map(data => data));
  }

  getAllNewBusiness() {
    return this.apiService.get("/payment-method-setup/new_business")
                  .pipe(map(data => data));
  }

  getAllRenewal() {
    return this.apiService.get("/payment-method-setup/renewal")
                  .pipe(map(data => data));
  }

  savePaymentMethodSetup(data): Observable<PaymentMethodSetup>{
      
    let payment_method_setup = { 
      "id"              : data.id,
      "method_name"     : data.method_name,
      "method_type"     : data.method_type
    }
    
    if(payment_method_setup.id){
      return this.apiService.put("/payment-method-setup/" + payment_method_setup.id , payment_method_setup)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/payment-method-setup", payment_method_setup)
                    .pipe(map(data => data));
    }
  }

  getPaymentMethodById(id: string): Observable<PaymentMethodSetup>{
    return this.apiService.get("/payment-method-setup/" + id)
                .pipe(map(data => data));
  }

  destroyPaymentMethod(id: string): Observable<PaymentMethodSetup>{
    return this.apiService.delete("/payment-method-setup/" + id)
                .pipe(map(data => data));
  }
}
