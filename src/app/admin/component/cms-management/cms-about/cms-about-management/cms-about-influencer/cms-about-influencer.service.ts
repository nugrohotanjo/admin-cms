// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsAboutInfluencer }           from './cms-about-influencer';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsAboutInfluencerService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsAboutInfluencer>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsAboutInfluencer>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsAboutInfluencer): Observable<CmsAboutInfluencer>{

    let cmsaboutinfluencer = {
        id                      : data.id,
        category                : data.category,
        image                   : data.image,
        youtube_code            : data.youtube_code,
        influencer_name         : data.influencer_name,
        influencer_profession   : data.influencer_profession,
        influencer_wording      : data.influencer_wording
    }
    
    if(cmsaboutinfluencer.id) {
      return this.apiService.put("/cms-carousel/" + cmsaboutinfluencer.id, cmsaboutinfluencer)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmsaboutinfluencer)
                    .pipe(map(data => data));
    }

  }

  destroyCarousel(id: string): Observable<CmsAboutInfluencer>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
