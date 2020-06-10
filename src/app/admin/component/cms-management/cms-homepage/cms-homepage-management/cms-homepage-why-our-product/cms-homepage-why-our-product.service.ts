// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsHomepageWhyOurProduct }                     from './cms-homepage-why-our-product';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsHomepageWhyOurProductService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsHomepageWhyOurProduct>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsHomepageWhyOurProduct>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsHomepageWhyOurProduct): Observable<CmsHomepageWhyOurProduct>{

    let cmshomepagewhyourproduct = {
        id                      : data.id,
        category                : data.category,
        title                   : data.title,
        description             : data.description,
        image                   : data.image,
    }
    
    if(cmshomepagewhyourproduct.id) {
      return this.apiService.put("/cms-carousel/" + cmshomepagewhyourproduct.id, cmshomepagewhyourproduct)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmshomepagewhyourproduct)
                    .pipe(map(data => data));
    }
  }

  destroyCarousel(id: string): Observable<CmsHomepageWhyOurProduct>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
