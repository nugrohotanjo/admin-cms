// Core
import { Injectable }               from '@angular/core';

// Model
import { ApiConsumer }                    from './api-consumer';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/api-consumer")
                  .pipe(map(data => data));
  }

  saveApiConsumer(data : ApiConsumer): Observable<ApiConsumer>{

    let apiConsumer = {
        id                  : data.id,
        email               : data.email,
        name                : data.name,
    }

    if(apiConsumer.id){
      return this.apiService.put("/api-consumer/" + apiConsumer.id , apiConsumer)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/api-consumer", apiConsumer)
                    .pipe(map(data => data));
    }
    
  }

  getApiConsumerById(id: string): Observable<ApiConsumer>{
    return this.apiService.get("/api-consumer/" + id)
                .pipe(map(data => data));
  }

  destroyApiConsumer(id: string): Observable<ApiConsumer>{
    return this.apiService.delete("/api-consumer/" + id)
                .pipe(map(data => data));
  }
}
