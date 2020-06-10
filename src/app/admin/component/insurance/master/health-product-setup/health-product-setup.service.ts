// Core
import { Injectable }               from '@angular/core';

// Model
import { HealthSetupProduct }      from './health-setup-product';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthProductSetupService {

  constructor(private apiService        : ApiService) { }

  getAllHealthRate() {
    // return this.apiService.get()
  }

  saveHealthSetup(data): Observable<HealthSetupProduct>{
    
    let datanya = data.data ? data.data.replace(/\s/g, "") : data.data

    let health_setup = { 
      "id"            : data.id,
      "parameter_name": data.name,
      "parameter_type": data.type,
      "data"          : datanya
    }
    
    if(health_setup.id){
      return this.apiService.put("/health-setup/" + health_setup.id , health_setup)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/health-setup", health_setup)
                    .pipe(map(data => data));
    }
  }

  getHealthSetupById(id: string): Observable<HealthSetupProduct>{
    return this.apiService.get("/health-setup/" + id)
                .pipe(map(data => data));
  }

  destroyHealthSetup(id: string): Observable<HealthSetupProduct>{
    return this.apiService.delete("/health-setup/" + id)
                .pipe(map(data => data));
  }
}
