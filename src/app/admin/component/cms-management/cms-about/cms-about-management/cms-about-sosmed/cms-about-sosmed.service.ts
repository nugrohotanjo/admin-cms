// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsAboutSosmed }           from './cms-about-sosmed';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsAboutSosmedService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsAboutSosmed>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsAboutSosmed>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsAboutSosmed): Observable<CmsAboutSosmed>{

    let cmsaboutsosmed = {
        id                      : data.id,
        category                : data.category,
        image                   : data.image,
        title                   : data.title,
        description             : data.description,
        button_1                : data.button_1,
        button_1_link           : data.button_1_link
    }
    
    if(cmsaboutsosmed.id) {
      return this.apiService.put("/cms-carousel/" + cmsaboutsosmed.id, cmsaboutsosmed)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmsaboutsosmed)
                    .pipe(map(data => data));
    }

  }

  destroyCarousel(id: string): Observable<CmsAboutSosmed>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
