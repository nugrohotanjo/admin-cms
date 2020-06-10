import { Injectable }         from '@angular/core';

// Service
import { ApiService }       from '../../shared/service/api.service';

// Dependency Injection RxJs
import { map }                from 'rxjs/operators';

@Injectable()
export class PermissionService {

  constructor( private apiService : ApiService ) { }

  getAllPermission(){
    return this.apiService.get("/permissions")
                  .pipe(map(data => data));
  }

}
