// Core
import { Injectable }               from '@angular/core';

// Model
import { Bank }                  from './bank';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private apiService        : ApiService) { }

  getBankByName(name: String): Observable<Bank>{
    return this.apiService.get("/bank/find/" + name)
                .pipe(map(data => data));
  }

  getAll() {
    return this.apiService.get("/bank")
      .pipe(map(data => data));
  }

  saveBank(data): Observable<Bank> {

    let bank = {
      id: data.id,
      bank_code: data.bank_code,
      name: data.name
    }

    if (bank.id) {
      return this.apiService.put("/bank/" + bank.id, bank)
        .pipe(map(data => data));
    } else {
      return this.apiService.post("/bank", bank)
        .pipe(map(data => data));
    }

  }

  getBankById(id: string): Observable<Bank> {
    return this.apiService.get("/bank/" + id)
      .pipe(map(data => data));
  }

  destroyBank(id: string): Observable<Bank> {
    return this.apiService.delete("/bank/" + id)
      .pipe(map(data => data));
  }
  
}
