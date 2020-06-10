// Core
import { Injectable }               from '@angular/core';

// Model
import { RiderSetupProduct }      from './rider-setup-product'

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RiderProductSetupService {

  constructor(private apiService        : ApiService) { }

  saveRiderSetup(data): Observable<RiderSetupProduct>{
    
    let datanya = data.data ? data.data.replace(/\s/g, "") : data.data

    let rider_setup = { 
      "id"            : data.id,
      "parameter_name": data.name,
      "parameter_type": data.type,
      "data"          : datanya
    }
    
    if(rider_setup.id){
      return this.apiService.put("/rider-setup/" + rider_setup.id , rider_setup)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/rider-setup", rider_setup)
                    .pipe(map(data => data));
    }
  }

  getRiderSetupById(id: string): Observable<RiderSetupProduct>{
    return this.apiService.get("/rider-setup/" + id)
                .pipe(map(data => data));
  }

  destroyRiderSetup(id: string): Observable<RiderSetupProduct>{
    return this.apiService.delete("/rider-setup/" + id)
                .pipe(map(data => data));
  }
}
