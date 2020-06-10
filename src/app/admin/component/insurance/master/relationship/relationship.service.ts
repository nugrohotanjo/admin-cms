// Core
import { Injectable }               from '@angular/core';

// Model
import { Relationship }                  from './relationship';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/customers-relation')
                  .pipe(map(data => data));
  }

  saveRelationship(data): Observable<Relationship>{

    let relationship = {
      "id"              : data.id,
      "relation_code"       : data.relation_code,
      "updateBy"        : data.updateBy,
      "relation_name"            : data.relation_name
    }
    
    if(relationship.id) {
      return this.apiService.put("/customer-relation/" + relationship.id , relationship)
                    .pipe(map(data => data));
    } else {
      return this.apiService.post("/customer-relation", relationship)
                    .pipe(map(data => data));
    }
    
  }

  getRelationshipById(id: string): Observable<Relationship>{
    return this.apiService.get("/customer-relation/" + id)
                .pipe(map(data => data));
  }

  destroyRelationship(id: string): Observable<Relationship>{
    return this.apiService.delete("/customer-relation/" + id)
                .pipe(map(data => data));
  }
}
