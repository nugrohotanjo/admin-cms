// Core
import { Injectable }               from '@angular/core';

// Model
import { BenefitLevel }             from './benefit-level';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BenefitLevelService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/benefit-level")
                  .pipe(map(data => data));
  }

  saveBenefitLevel(data): Observable<BenefitLevel>{

    let benefit_level = {
      "id"              : data.id,
      "benefit_level"   : data.benefit_level,
      "benefit_amount"  : data.benefit_amount,
    }
    
    if(benefit_level.id){
      return this.apiService.put("/benefit-level/" + benefit_level.id , benefit_level)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/benefit-level", benefit_level)
                    .pipe(map(data => data));
    }
    
  }

  getBenefitLevelById(id: string): Observable<BenefitLevel>{
    return this.apiService.get("/benefit-level/" + id)
                .pipe(map(data => data));
  }

  destroyBenefitLevel(id: string): Observable<BenefitLevel>{
    return this.apiService.delete("/benefit-level/" + id)
                .pipe(map(data => data));
  }
}
