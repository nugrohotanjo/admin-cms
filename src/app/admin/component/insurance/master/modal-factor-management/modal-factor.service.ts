// Core
import { Injectable }               from '@angular/core';

// Model
import { ModalFactor }              from './modal-factor'

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalFactorService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/modal-factor")
                  .pipe(map(data => data));
  }

  saveModalFactor(data): Observable<ModalFactor>{
    let modal_factor = {
      "id"            : data.id,
      "frequency"     : data.frequency
    }
    
    if(modal_factor.id){
      return this.apiService.put("/modal-factor/" + modal_factor.id , modal_factor)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/modal-factor", modal_factor)
                    .pipe(map(data => data));
    }
  }

  getModalFactorById(id: string): Observable<ModalFactor>{
    return this.apiService.get("/modal-factor/" + id)
                .pipe(map(data => data));
  }

  destroyModalFactor(id: string): Observable<ModalFactor>{
    return this.apiService.delete("/modal-factor/" + id)
                .pipe(map(data => data));
  }
}
