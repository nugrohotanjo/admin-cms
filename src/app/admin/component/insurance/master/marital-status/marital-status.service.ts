// Core
import { Injectable }               from '@angular/core';

// Model
import { MaritalStatus }                  from './marital-status';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MaritalStatusService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/marital-status')
                  .pipe(map(data => data));
  }

  saveMarital(data): Observable<MaritalStatus>{

    let marital = {
      "id"                              : data.id,
      "marital_status_core_id"          : data.marital_status_core_id,
      "updateBy"                        : data.updateBy,
      "name"                            : data.name
    }

    if(marital.id) {
      return this.apiService.put("/marital-status/" + marital.id , marital)
                    .pipe(map(data => data));
    } else {
      return this.apiService.post("/marital-status", marital)
                    .pipe(map(data => data));
    }
    
  }

  getMaritalStatusById(id: string): Observable<MaritalStatus>{
    return this.apiService.get("/marital-status/" + id)
                .pipe(map(data => data));
  }

  destroyMarital(id: string): Observable<MaritalStatus>{
    return this.apiService.delete("/marital-status/" + id)
                .pipe(map(data => data));
  }
}
