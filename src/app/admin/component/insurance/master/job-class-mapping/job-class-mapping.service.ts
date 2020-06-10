// Core
import { Injectable }               from '@angular/core';

// Model
import { JobClassMapping }                  from './job-class-mapping';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobClassMappingService {

  constructor(private apiService        : ApiService) { }

  saveJobClassMapping(job_class_mapping, body: Array<JobClassMapping> = []): Observable<JobClassMapping> {

    let x = null // sediain dlu variablenya
    job_class_mapping.map((data) => {
        x = {
            "product_id" : {
                "id" : data.product_id
            },
            "job_id" : {
                "id" : data.job_class.id
            },
            "job_class_mapping" : data.class
        }

        body.push(x) // push ke array jsonnya
    })

    return this.apiService.post("/product-job-class", body)
                  .pipe(map(data => data))
  }

  getJobClassByProductId(product_id): Observable<Array<JobClassMapping>> {
    return this.apiService.get("/product-job-class/product/" + product_id)
                        .pipe(map(data => data))
  }

  deleteByProductId(product_id) {
    return this.apiService.delete("/product-job-class/product/" + product_id)
                        .pipe(map(data => data))
  }

}
