// Core
import { Injectable }               from '@angular/core';

// Model
import { Faq }                    from './faq';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/faq")
                  .pipe(map(data => data));
  }

  saveFaq(data): Observable<Faq>{

    let faq = {
        id                  : data.id,
        question            : data.question,
        answer              : data.answer,
        category            : data.category
    }

    if(faq.id){
      return this.apiService.put("/faq/" + faq.id , faq)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/faq", faq)
                    .pipe(map(data => data));
    }
    
  }

  getFaqById(id: string): Observable<Faq>{
    return this.apiService.get("/faq/" + id)
                .pipe(map(data => data));
  }

  destroyFaq(id: string): Observable<Faq>{
    return this.apiService.delete("/faq/" + id)
                .pipe(map(data => data));
  }


}
