// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsAboutInfluencerBio }           from './cms-about-influencer-bio';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsAboutInfluencerBioService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsAboutInfluencerBio>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsAboutInfluencerBio>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsAboutInfluencerBio): Observable<CmsAboutInfluencerBio>{

    let cmsaboutinfluencerbio = {
        id                      : data.id,
        category                : data.category,
        image                   : data.image,
        youtube_code            : data.youtube_code,
        influencer_name         : data.influencer_name,
        influencer_profession   : data.influencer_profession,
        influencer_wording      : data.influencer_wording,
        influencer_picture      : data.influencer_picture
    }
    
    if(cmsaboutinfluencerbio.id) {
      return this.apiService.put("/cms-carousel/" + cmsaboutinfluencerbio.id, cmsaboutinfluencerbio)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmsaboutinfluencerbio)
                    .pipe(map(data => data));
    }

  }

  destroyCarousel(id: string): Observable<CmsAboutInfluencerBio>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
