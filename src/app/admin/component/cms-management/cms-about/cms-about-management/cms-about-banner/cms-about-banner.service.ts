// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsAboutBanner }  from './cms-about-banner';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsAboutBannerService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsAboutBanner>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsAboutBanner>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsAboutBanner): Observable<CmsAboutBanner>{

    let cmsaboutbanner = {
        id                      : data.id,
        category                : data.category,
        title                   : data.title,
        image                   : data.image,
        influencer_picture      : data.thumbnail,
        button_1                : data.button_1,
        button_2                : data.button_2,
        youtube_code            : data.youtube_code,
    }
    
    if(cmsaboutbanner.id) {
      return this.apiService.put("/cms-carousel/" + cmsaboutbanner.id, cmsaboutbanner)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmsaboutbanner)
                    .pipe(map(data => data));
    }


  }

}
