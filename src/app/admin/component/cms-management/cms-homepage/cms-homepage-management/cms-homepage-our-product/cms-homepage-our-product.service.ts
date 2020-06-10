// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsHomepageOurProduct }                     from './cms-homepage-our-product';

// Service
import { ApiService }               from '../../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CmsHomepageOurProductService {

  constructor(private apiService        : ApiService) { }

  getCarouselByCategory(category: String): Observable<Array<CmsHomepageOurProduct>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsHomepageOurProduct>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsHomepageOurProduct): Observable<CmsHomepageOurProduct>{

    let cmshomepageourproduct = {
        id                      : data.id,
        insurance_name          : data.insurance_name,
        category                : data.category,
        title                   : data.title,
        description             : data.description,
        footer_description      : data.footer_description,
        image                   : data.image,
        link                    : data.link
    }
    console.log("idnya " + cmshomepageourproduct.id);
    if(cmshomepageourproduct.id) {
      return this.apiService.put("/cms-carousel/" + cmshomepageourproduct.id, cmshomepageourproduct)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmshomepageourproduct)
                    .pipe(map(data => data));
    }


  }

  destroyCarousel(id: string): Observable<CmsHomepageOurProduct>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
