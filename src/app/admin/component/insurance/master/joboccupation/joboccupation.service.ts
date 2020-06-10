// Core
import { Injectable }               from '@angular/core';

// Model
import { JobOccupation }                    from './joboccupation';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';
import { GetCurrentUserService }    from 'src/app/admin/shared/service/getCurrentUser.service';

@Injectable({
  providedIn: 'root'
})
export class JobOccupationService {

  constructor(private apiService        : ApiService,
              private getCurrentUserService : GetCurrentUserService) { }

  getAll(){
    return this.apiService.get("/jobs-occupation")
                  .pipe(map(data => data));
  }

  saveJobOccupation(data): Observable<JobOccupation>{

    let job = {
        id                  : data.id,
        class_1             : data.class_1,
        class_2             : data.class_2,
        class_3             : data.class_3,
        job_code            : data.job_code,
        job_core_id         : data.job_core_id,
        updateBy            : data.update_by
    }

    if(job.id){
      return this.apiService.put("/job-occupation/" + job.id , job)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/job-occupation", job)
                    .pipe(map(data => data));
    }
    
  }

  saveViaExcel(data,body: Array<JobOccupation> = []) : Observable<JobOccupation>{

    let user = this.getCurrentUserService.getUserData()

    let x = null // siapin dlu variablenya

    data.map(data => {

      x = {
        "class_1"                     : data.class_1,
        "class_2"                     : data.class_2,
        "class_3"                     : data.class_3,
        "job_code"                    : data.job_code,
        "job_core_id"                 : data.job_core_id,
        "updateBy"                    : user.name
      }
    
      body.push(x) // push datanya 
    })
    return this.apiService.post('/job-occupation/all', body)
                        .pipe(map(data => data));
      
  }

  getJobOccupationById(id: string): Observable<JobOccupation>{
    return this.apiService.get("/job-occupation/" + id)
                .pipe(map(data => data));
  }

  destroyJobOccupation(id: string): Observable<JobOccupation>{
    return this.apiService.delete("/job-occupation/" + id)
                .pipe(map(data => data));
  }
}
