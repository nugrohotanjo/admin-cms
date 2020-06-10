// Core
import { Injectable }               from '@angular/core';

// Model
import { CmsHomepageHowToBuy }                     from './cms-homepage-how-to-buy';

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

  getCarouselByCategory(category: String): Observable<Array<CmsHomepageHowToBuy>>{
    return this.apiService.get("/cms-carousel/category/" + category)
                .pipe(map(data => data));
  }

  getCarouselById(id: string): Observable<CmsHomepageHowToBuy>{
    return this.apiService.get("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

  saveCarousel(data : CmsHomepageHowToBuy): Observable<CmsHomepageHowToBuy>{

    let cmshomepageourproduct = {
        id                      : data.id,
        category                : data.category,
        title                   : data.title,
        description             : data.description,
        image                   : data.image
    }
    
    if(cmshomepageourproduct.id) {
      return this.apiService.put("/cms-carousel/" + cmshomepageourproduct.id, cmshomepageourproduct)
                  .pipe(map(data => data));
    } else {
      return this.apiService.post("/cms-carousel", cmshomepageourproduct)
                    .pipe(map(data => data));
    }


  }

  destroyCarousel(id: string): Observable<CmsHomepageHowToBuy>{
    return this.apiService.delete("/cms-carousel/" + id)
                .pipe(map(data => data));
  }

}
