// Core
import { Injectable }               from '@angular/core';

// Model
import { Log }                     from './log';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private apiService        : ApiService) { }

  storeLog(data, category, message, origin = null, new_update = null): Observable<Log>{
    let log = {
      "name"        : data.name,
      "category"    : category,
      "activity"    : message,
      "origin_data" : JSON.stringify(origin),
      "new_update"  : JSON.stringify(new_update)
    }

    return this.apiService.post("/log", log)
                    .pipe(map(data => data))
  }

  getLogById(id): Observable<Log> {
    return this.apiService.get("/log/" + id)
                    .pipe(map(data => data))
  }

}
