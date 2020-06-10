import { Injectable }       from '@angular/core';

// Model
import { EventCategory }    from './event-category';

// Service
import { ApiService }       from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventCategoryService {

  constructor(private apiService        : ApiService) { }

  saveCategoryEvent(data): Observable<EventCategory>{

    let categoryEvent = {
      "name"          : data.name,
      "description"   : data.description,
    }

    return this.apiService.post("/event/category", categoryEvent)
            .pipe(map(data => data))
  }

  getAllCategory(){
    return this.apiService.get("/event/category")
                  .pipe(map(data => data))
  }

  getCategoryEventById(id: string): Observable<EventCategory>{
    return this.apiService.get("/event/category/" + id)
                .pipe(map(data => data));
  }

  updateCategoryEvent(id, data): Observable<EventCategory>{

    let categoryEvent = {
      "id"            : data.id,
      "name"          : data.name,
      "description"   : data.description,
    }

    return this.apiService.put("/event/category/" + id , categoryEvent)
                  .pipe(map(data => data));
  }

  destroyCategoryEvent(id): Observable<EventCategory>{
    return this.apiService.delete("/event/category/" + id)
                .pipe(map(data => data));
  }

}
