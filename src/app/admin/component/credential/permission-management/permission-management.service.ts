// Core
import { Injectable }               from '@angular/core';

// Model
import { Permission }                     from './permission';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

// SharedPipe
import { SlugifyPipe }              from '../../../shared/pipe/slugify.pipe'; 

@Injectable({
  providedIn: 'root'
})
export class PermissionManagementService {

  constructor( private apiService : ApiService, 
                private slugifyPipe : SlugifyPipe) { }

  getPermissions(): Observable<Array<Permission>>{
    return this.apiService.get("/permissions")
                      .pipe(map(data => data));
  }

  getPermissionById(id: String): Observable<Permission>{
    return this.apiService.get("/permission/" + id)
                      .pipe(map(data => data));
  }

  savePermission(data): Observable<Permission>{

    const permission = {
        id                      : data.id,
        permission_name         : data.permission_name,
        description             : data.description,
        slug                    : this.slugifyPipe.transform(data.permission_name)
    }

    if(permission.id){
        return this.apiService.put("/permission/" + permission.id , permission)
                      .pipe(map(data => data));
    }else{
        return this.apiService.post("/permission", permission)
                        .pipe(map(data => data));
    }
  }

  destroyPermission(id: string): Observable<Permission>{
    return this.apiService.delete("/permission/" + id)
                .pipe(map(data => data));
  }
}
