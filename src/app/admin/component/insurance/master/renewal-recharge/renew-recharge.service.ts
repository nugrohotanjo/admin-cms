// Core
import { Injectable }               from '@angular/core';

// Model
import { RenewRecharge }            from './renew-recharge';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RenewRechargeService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/renew-recharge")
                  .pipe(map(data => data));
  }

  saveRenewRecharge(data): Observable<RenewRecharge>{

    let renewRecharge = {
        id                  : data.id,
        description         : data.description,
        name                : data.name,
        code                : data.code,
        day                 : data.day,
        max_attempt         : data.max_attempt
    }

    if(renewRecharge.id){
      return this.apiService.put("/renew-recharge/" + renewRecharge.id , renewRecharge)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/renew-recharge", renewRecharge)
                    .pipe(map(data => data));
    }
    
  }

  getRenewRechargeById(id: string): Observable<RenewRecharge>{
    return this.apiService.get("/renew-recharge/" + id)
                .pipe(map(data => data));
  }

  destroyRenewRecharge(id: string): Observable<RenewRecharge>{
    return this.apiService.delete("/renew-recharge/" + id)
                .pipe(map(data => data));
  }
}
