// Core
import { Injectable }               from '@angular/core';

// Model
import { SinglePage }                     from './single_page';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SinglePageService {

  constructor(private apiService        : ApiService) { }

  saveSinglePage(data): Observable<SinglePage>{
    let singlePage = {
      "title"               : data.title,
      "content"             : data.content,
      "status_publish"      : data.status,
      "meta_description"    : data.meta_description,
      "meta_keyword"        : data.meta_keyword,
      "thumbnail"           : data.thumbnail
    }

    return this.apiService.post("/single-page", singlePage)
                  .pipe(map(data => data))
  }

  getSinglePageById(id){
    return this.apiService.get("/single-page/" + id)
                  .pipe(map(data => data))
  }

  updateSinglePage(id, data): Observable<SinglePage>{
    let singlePage = {
      "title"                 : data.title,
      "content"               : data.content,
      "status_publish"        : data.status,
      "meta_description"      : data.meta_description,
      "meta_keyword"          : data.meta_keyword,
      "thumbnail"             : data.thumbnail
    }

    return this.apiService.put("/single-page/" + id, singlePage)
                  .pipe(map(data => data))
  }

  destroySinglePage(id){
    return this.apiService.delete("/single-page/" + id)
                  .pipe(map(data => data))
  }
}
