// Core
import { Injectable }               from '@angular/core';

// Model
import { RelationshipBeneficiary }                  from './relationship-beneficiary';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RelationshipBeneficiaryService {

  constructor(private apiService        : ApiService) { }

  getAll() {
    return this.apiService.get('/customer-relation-beneficiary')
                  .pipe(map(data => data));
  }

  saveRelationship2(data): Observable<RelationshipBeneficiary> {

    let relationship = {
      "id"                      : data.id,
      "relation_code"           : data.relation_code,
      "updateBy"                : data.updateBy,
      "relation_name"           : data.relation_name
    }
    
    if(relationship.id) {
      return this.apiService.put("/customer-relation-beneficiary/" + relationship.id , relationship)
                    .pipe(map(data => data));
    } else {
      return this.apiService.post("/customer-relation-beneficiary", relationship)
                    .pipe(map(data => data));
    }
    
  }

  getRelationship2ById(id: string): Observable<RelationshipBeneficiary>{
    return this.apiService.get("/customer-relation-beneficiary/" + id)
                .pipe(map(data => data));
  }

  destroyRelationship2(id: string): Observable<RelationshipBeneficiary>{
    return this.apiService.delete("/customer-relation-beneficiary/" + id)
                .pipe(map(data => data));
  }

}
