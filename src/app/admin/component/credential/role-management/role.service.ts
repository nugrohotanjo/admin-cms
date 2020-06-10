// Core
import { Injectable }               from '@angular/core';

// Model
import { Role }                     from './role';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// SharedPipe
import { SlugifyPipe }              from '../../../shared/pipe/slugify.pipe'; 

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(  private apiService        : ApiService, private slugifyPipe       : SlugifyPipe) { }

  getRoles(): Observable<Role[]> {
    return this.apiService.get("/roles")
                .pipe(map(data => data));
  }

  getRoleById(id: string): Observable<Role>{
    return this.apiService.get("/role/" + id)
                .pipe(map(data => data));
  }

  saveRole(data): Observable<Role>{
    let role ={
      "name" : data.name,
      "name_slug" : this.slugifyPipe.transform(data.name),
      "description" : data.description,
      "permission": data.selectedPermission
    }
    return this.apiService.post("/role", role)
                .pipe(map(data => data));
  }

  updateRole(id, data): Observable<Role>{

    let role ={
      "name" : data.name,
      "description" : data.description,
      "permission": data.selectedPermission
    }
    
    return this.apiService.put("/role/" + id, role)
                .pipe(map(data => data));
  }

  destroyRole(id: string): Observable<Role>{
    return this.apiService.delete("/role/" + id)
                .pipe(map(data => data));
  }

}
