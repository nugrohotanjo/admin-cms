// Core
import { Injectable }               from '@angular/core';
import { HttpClient }  from '@angular/common/http';

// Model
import { Cta }                  from './cta';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                      from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CtaService {

  constructor(private apiService        : ApiService) { }

  getCtaById(id) {
    return this.apiService.get("/quotation/" + id)
                        .pipe(map(data => data));
  }
  
}
