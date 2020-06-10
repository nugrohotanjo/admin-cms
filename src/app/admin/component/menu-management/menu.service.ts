// Core
import { Injectable }               from '@angular/core';

// Model
import { Menu }                     from './menu';

// Service
import { ApiService }               from '../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private apiService        : ApiService) { }

  getAllMenu(): Observable<Menu[]>{
    return this.apiService.get("/menu")
                  .pipe(map(data => data))
  }

  getMenuById(id): Observable<Menu>{
    return this.apiService.get("/menu/" + id)
                  .pipe(map(data => data))
  }

  saveMenu(data): Observable<Menu>{
    let menu = {
      "name" : data.name,
      "link" : data.link,
      "type" : data.type
    }

    return this.apiService.post("/menu", menu)
                    .pipe(map(data => data))
  }

  updateMenu(id, data): Observable<Menu>{
    let menu = {
      "name" : data.name,
      "link" : data.link,
      "type" : data.type
    }
    return this.apiService.put("/menu/" + id, menu)
                      .pipe(map(data => data))
  }

  destroyMenu(id): Observable<Menu>{
    return this.apiService.delete("/menu/" + id)
                    .pipe(map(data => data))
  }
}
