// Core
import { Injectable }               from '@angular/core';

// Model
import { City }                  from './city';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private apiService        : ApiService) { }

  getCityById(id): Observable<City>{
    return this.apiService.get("/city/id/" + id)
                .pipe(map(data => data));
  }
  
}
