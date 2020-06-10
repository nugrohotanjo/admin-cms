// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsHomepageStoryBehindInsurance } from './cms-homepage-story-behind-insurance';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsHomepageStoryBehindInsuranceService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsHomepageStoryBehindInsurance>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsHomepageStoryBehindInsurance>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsHomepageStoryBehindInsurance): Observable<CmsHomepageStoryBehindInsurance>{

    let cmshomepagestorybehindinsurance = {
        id                      : data.id,
        category                : data.category,
        title                   : data.title,
        youtube_code            : data.youtube_code,
        image                   : data.thumbnail,
    }
    
    if(cmshomepagestorybehindinsurance.id) {
      return this.apiService.put("/cms-carousel/" + cmshomepagestorybehindinsurance.id, cmshomepagestorybehindinsurance)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmshomepagestorybehindinsurance)
                    .pipe(map(data => data));
    }
  }

  destroyCarousel(id: string): Observable<CmsHomepageStoryBehindInsurance>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
