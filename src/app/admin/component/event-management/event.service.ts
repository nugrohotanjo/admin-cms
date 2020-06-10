import { Injectable }       from '@angular/core'

// Model
import { Event }            from './event'

// Service
import { ApiService }       from '../../shared/service/api.service'

// Dependency Injection RxJs
import { Observable }       from 'rxjs'
import { map }              from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private apiService        : ApiService) { }

  saveEvent(data): Observable<Event>{
    let excerpt = data.content.substring(0,160);
    
    let event = {
      "title"               : data.title,
      "cover"               : data.thumbnail,
      "content"             : data.content,
      "excerpt"             : excerpt,
      "status_publish"      : data.status,
      "category"            : data.category,
      "meta_description"    : data.meta_description,
      "meta_keyword"        : data.meta_keyword
    }
    
    return this.apiService.post("/event", event)
                  .pipe(map(data => data))
  }

  updateEvent(id, data): Observable<Event>{
    let excerpt = data.content.substring(0,160);
    let event = {
      "title"               : data.title,
      "cover"               : data.thumbnail,
      "content"             : data.content,
      "excerpt"             : excerpt,
      "status_publish"      : data.status,
      "category"            : data.category,
      "meta_description"    : data.meta_description,
      "meta_keyword"        : data.meta_keyword
    }

    return this.apiService.put("/event/" + id, event)
                  .pipe(map(data => data))
  }

  getEventById(id): Observable<Event>{
    return this.apiService.get("/event/" + id)
                  .pipe(map(data => data))
  }

  destroyEvent(id): Observable<Event>{
    return this.apiService.delete("/event/" + id)
                  .pipe(map(data => data))
  }

}
