// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsCarouselPosition }                     from '../models/cmscarouselposition';

// Service
import { ApiService }               from '../service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsCarouselPositionService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<CmsCarouselPosition>{
    return this.apiService.get("/cms-carousel-position/category/" + category)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsCarouselPosition): Observable<CmsCarouselPosition>{

    let cmsCarouselPosition = {
        id                      : data.id,
        content                 : data.content,
        category                : data.category,
    }

    if(cmsCarouselPosition.id) {
      return this.apiService.put("/cms-carousel-position/" + cmsCarouselPosition.id, cmsCarouselPosition)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel-position", cmsCarouselPosition)
                    .pipe(map(data => data));
    }


  }

}
