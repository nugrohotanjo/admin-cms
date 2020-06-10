// Core
import { Injectable }               from '@angular/core';

// Model
import { MasterSetupRate }          from './master-setup-rate';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterSetupRateService {

  constructor(private apiService        : ApiService) { }

  getAllSetupRate() {
    return this.apiService.get("/master-setup-rates/")
                    .pipe(map(data => data));
  }

  getMasterRateByCategory(id) {
    return this.apiService.get("/master-setup-rates/category/" + id)
  }

  save(data): Observable<MasterSetupRate>{
    
    let rate_data = {
      "id"              : data.id,
      "category_id"        : {
          "id" : parseInt(data.product_category)
      },
      "parameter_name"  : data.name,
      "parameter_type"  : data.type,
      "value"           : data.value
    }

    if(rate_data.id){
      return this.apiService.put("/master-setup-rate/" + rate_data.id , rate_data)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/master-setup-rate", rate_data)
                    .pipe(map(data => data));
    }
  }

  getRateSetupById(id: string): Observable<MasterSetupRate>{
    return this.apiService.get("/master-setup-rate/" + id)
                .pipe(map(data => data));
  }

  destroyRateSetup(id: string): Observable<MasterSetupRate>{
    return this.apiService.delete("/master-setup-rate/" + id)
                .pipe(map(data => data));
  }
}
