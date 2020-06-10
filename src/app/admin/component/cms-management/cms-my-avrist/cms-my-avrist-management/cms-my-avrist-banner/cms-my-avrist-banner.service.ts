// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsMyAvristBanner }           from './cms-my-avrist-banner';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsMyAvristBannerService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsMyAvristBanner>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsMyAvristBanner>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsMyAvristBanner): Observable<CmsMyAvristBanner>{

    let cmsmyavristbanner = {
        id                      : data.id,
        category                : data.category,
        title                   : data.title,
        image                   : data.image,
        description             : data.description,
        button_1                : data.button_1,
        button_1_link           : data.button_1_link,
    }
    
    if(cmsmyavristbanner.id) {
      return this.apiService.put("/cms-carousel/" + cmsmyavristbanner.id, cmsmyavristbanner)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmsmyavristbanner)
                    .pipe(map(data => data));
    }


  }

}
