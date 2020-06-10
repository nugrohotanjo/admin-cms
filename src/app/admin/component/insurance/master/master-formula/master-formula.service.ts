// Core
import { Injectable }               from '@angular/core';

// Model
import { MasterFormula }             from './master-formula';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterFormulaService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/formula")
                  .pipe(map(data => data));
  }

  saveFormula(data, Formula): Observable<MasterFormula>{
    console.log(data)
    let DataFormula = {
        "id"                : data.id,
        "age_basis"         : data.age_basis,
        "formula"           : data.label,
        "category_id"       : {
          "id"              : parseInt(data.product_type)
        },
        "value"             : Formula.toString()
    }
    console.log(DataFormula)
    
    if(DataFormula.id){
      return this.apiService.put("/formula/" + DataFormula.id , DataFormula)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/formula", DataFormula)
                    .pipe(map(data => data));
    }
  }

  getFormulaById(id: string): Observable<MasterFormula>{
    return this.apiService.get("/formula/" + id)
                .pipe(map(data => data));
  }

  destroyFormula(id: string): Observable<MasterFormula>{
    return this.apiService.delete("/formula/" + id)
                .pipe(map(data => data));
  }
}
