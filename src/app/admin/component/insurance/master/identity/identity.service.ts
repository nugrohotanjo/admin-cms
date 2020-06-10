// Core
import { Injectable }               from '@angular/core';

// Model
import { Identity }                  from './identity';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/id-type')
                  .pipe(map(data => data));
  }

  saveIdentity(data): Observable<Identity>{

    let identity = {
      "id"              : data.id,
      "core_code"       : data.core_code,
      "updateBy"        : data.updateBy,
      "name"            : data.name
    }

    if(identity.id){
      return this.apiService.put("/id-type/" + identity.id , identity)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/id-type", identity)
                    .pipe(map(data => data));
    }
    
  }

  getIdentityById(id: string): Observable<Identity>{
    return this.apiService.get("/id-type/" + id)
                .pipe(map(data => data));
  }

  destroyIdentity(id: string): Observable<Identity>{
    return this.apiService.delete("/id-type/" + id)
                .pipe(map(data => data));
  }
}
