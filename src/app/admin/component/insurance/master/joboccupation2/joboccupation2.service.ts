// Core
import { Injectable }               from '@angular/core';

// Model
import { JobOccupation2 }                    from './joboccupation2';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';
import { GetCurrentUserService }    from 'src/app/admin/shared/service/getCurrentUser.service';

@Injectable({
  providedIn: 'root'
})
export class JobOccupation2Service {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/jobs-occupation2")
                  .pipe(map(data => data));
  }

  saveJobOccupation2(data): Observable<JobOccupation2>{

    let job = {
        id                          : data.id,
        job_code                    : data.job_code,
        description                 : data.description,
    }

    if(job.id){
      return this.apiService.put("/job-occupation2/" + job.id , job)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/job-occupation2", job)
                    .pipe(map(data => data));
    }
    
  }

  getJobOccupation2ById(id: string): Observable<JobOccupation2>{
    return this.apiService.get("/job-occupation2/" + id)
                .pipe(map(data => data));
  }

  destroyJobOccupation2(id: string): Observable<JobOccupation2>{
    return this.apiService.delete("/job-occupation2/" + id)
                .pipe(map(data => data));
  }
}
