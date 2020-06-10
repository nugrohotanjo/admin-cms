// Core
import { Injectable }               from '@angular/core';

// Model
import { JobClass }                  from './job-class';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobClassService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/job-class')
                  .pipe(map(data => data));
  }

  saveJobClass(data): Observable<JobClass>{

    let jobClass = {
      "id"              : data.id,
      "job_code"        : data.job_code,
      "job_name"        : data.job_name
    }

    if(jobClass.id){
      return this.apiService.put("/job-class/" + jobClass.id , jobClass)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/job-class", jobClass)
                    .pipe(map(data => data));
    }
    
  }

  getJobClassById(id: string): Observable<JobClass>{
    return this.apiService.get("/job-class/" + id)
                .pipe(map(data => data));
  }

  destroyJobClass(id: string): Observable<JobClass>{
    return this.apiService.delete("/job-class/" + id)
                .pipe(map(data => data));
  }
}
