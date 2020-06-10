// Core
import { Injectable }               from '@angular/core';

// Model
import { Currency }                  from './currency';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/currencies')
                  .pipe(map(data => data));
  }

  saveCurrency(data): Observable<Currency>{

    let currency = {
      "id"              : data.id,
      "code"            : data.code,
      "core_id"         : data.core_id,
      "name"            : data.name,
      "pattern"         : data.pattern
    }
    
    if(currency.id){
      return this.apiService.put("/currency/" + currency.id , currency)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/currency", currency)
                    .pipe(map(data => data));
    }
    
  }

  getCurrencyById(id: String): Observable<Currency>{
    return this.apiService.get("/currency/" + id)
                .pipe(map(data => data));
  }

  destroyCurrency(id: String): Observable<Currency>{
    return this.apiService.delete("/currency/" + id)
                .pipe(map(data => data));
  }
}
