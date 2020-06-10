// Core
import { Injectable }               from '@angular/core';

// Model
import { Benefit }                  from './benefit';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

// SharedPipe
import { SlugifyPipe }              from '../../../../shared/pipe/slugify.pipe'; 

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  constructor(private apiService        : ApiService,
              private slugifyPipe       : SlugifyPipe) { }

  getAll() {
    return this.apiService.get('/benefit')
                  .pipe(map(data => data));
  }

  saveBenefit(data): Observable<Benefit>{

    let benefit = {
      "id"                      : data.id,
      "benefit_code"            : data.benefit_code,
      "benefit_name"            : data.benefit_name,
      "benefit_type"            : data.benefit_type,
      "benefit_group"           : data.benefit_group.toLowerCase(),
      "benefit_description"     : data.benefit_description,
      "benefit_group_slug"      : this.slugifyPipe.transform(data.benefit_group)
    }
    
    if(benefit.id){
      return this.apiService.put("/benefit/" + benefit.id , benefit)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/benefit", benefit)
                    .pipe(map(data => data));
    }
    
  }

  getBenefitById(id: string): Observable<Benefit>{
    return this.apiService.get("/benefit/" + id)
                .pipe(map(data => data));
  }

  destroyBenefit(id: string): Observable<Benefit>{
    return this.apiService.delete("/benefit/" + id)
                .pipe(map(data => data));
  }
}
