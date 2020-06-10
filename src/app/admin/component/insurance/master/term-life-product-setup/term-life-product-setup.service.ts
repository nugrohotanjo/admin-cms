// Core
import { Injectable }               from '@angular/core';

// Model
import { TermLifeSetupProduct }     from './term-life-setup-product'

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TermLifeProductSetupService {

  constructor(private apiService        : ApiService) { }

  saveTermLifeSetup(data): Observable<TermLifeSetupProduct>{
    
    let datanya = data.data ? data.data.replace(/\s/g, "") : data.data

    let term_life_setup = { 
      "id"            : data.id,
      "parameter_name": data.name,
      "parameter_type": data.type,
      "data"          : datanya
    }
    
    if(term_life_setup.id){
      return this.apiService.put("/term-life-setup/" + term_life_setup.id , term_life_setup)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/term-life-setup", term_life_setup)
                    .pipe(map(data => data));
    }
  }

  getTermLifeSetupById(id: string): Observable<TermLifeSetupProduct>{
    return this.apiService.get("/term-life-setup/" + id)
                .pipe(map(data => data));
  }

  destroyTermLifeSetup(id: string): Observable<TermLifeSetupProduct>{
    return this.apiService.delete("/term-life-setup/" + id)
                .pipe(map(data => data));
  }
}
