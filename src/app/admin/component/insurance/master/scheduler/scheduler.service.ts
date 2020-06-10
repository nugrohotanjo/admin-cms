// Core
import { Injectable }               from '@angular/core';

// Model
import { Scheduler }                    from './scheduler';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/scheduler-time")
                  .pipe(map(data => data));
  }

  saveScheduler(data): Observable<Scheduler>{

    let scheduler = {
        id                  : data.id,
        description         : data.description,
        name                : data.name,
        code                : data.code,
        hour                : data.hour,
        minute              : data.minute
    }

    if(scheduler.id){
      return this.apiService.put("/scheduler-time/" + scheduler.id , scheduler)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/scheduler-time", scheduler)
                    .pipe(map(data => data));
    }
    
  }

  getSchedulerById(id: string): Observable<Scheduler>{
    return this.apiService.get("/scheduler-time/" + id)
                .pipe(map(data => data));
  }

  destroyScheduler(id: string): Observable<Scheduler>{
    return this.apiService.delete("/scheduler-time/" + id)
                .pipe(map(data => data));
  }
}
