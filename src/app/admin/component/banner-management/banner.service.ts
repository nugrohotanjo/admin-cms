import { Injectable }       from '@angular/core';

// Model
import { Banner }           from './banner';

// Service
import { ApiService }       from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private apiService        : ApiService) { }

  saveBanner(data){
    let banner ={
      "name"          : data.name,
      "image"         : data.thumbnail,
      "link"          : data.link,
      "description"   : data.description,
      "banner_alt"    : data.banner_alt,
    }
    return this.apiService.post("/banner", banner)
                    .pipe(map(data => data))
  }

  getBannerById(id){
    return this.apiService.get("/banner/" + id)
                    .pipe(map(data => data))
  }

  updateBanner(id, data){
    let banner ={
      "name"          : data.name,
      "image"         : data.thumbnail,
      "link"          : data.link,
      "description"   : data.description,
      "banner_alt"    : data.banner_alt,
    }
    return this.apiService.put("/banner/" + id, banner)
                    .pipe(map(data => data))
  }

  destroyBanner(id): Observable<Banner>{
    return this.apiService.delete("/banner/" + id)
                    .pipe(map(data => data))
  }
}
