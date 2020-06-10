// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsHomepageAllInsurance }                     from './cms-homepage-all-insurance';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsHomepageAllInsuranceService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsHomepageAllInsurance>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsHomepageAllInsurance>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsHomepageAllInsurance): Observable<CmsHomepageAllInsurance>{

    let cmshomepageallinsurance = {
        id                      : data.id,
        category                : data.category,
        title                   : data.title,
        insurance_name          : data.insurance_name,
        description             : data.description,
        link                    : data.link,
        image                   : data.image
    }
    
    if(cmshomepageallinsurance.id) {
      return this.apiService.put("/cms-carousel/" + cmshomepageallinsurance.id, cmshomepageallinsurance)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmshomepageallinsurance)
                    .pipe(map(data => data));
    }


  }

  destroyCarousel(id: string): Observable<CmsHomepageAllInsurance>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
