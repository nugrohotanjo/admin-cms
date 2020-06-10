// Core
import { Injectable }               from '@angular/core';

// Model
import { EmailPIC }                    from './emailpic';

// Service
import { ApiService }               from '../../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailpicService {

  constructor(private apiService        : ApiService) { }

  getAll(){
    return this.apiService.get("/emails-pic")
                  .pipe(map(data => data));
  }

  saveEmail(data): Observable<EmailPIC>{

    let emailpic = {
        id                  : data.id,
        email               : data.email,
        name                : data.name,
        category            : data.category,
        description         : data.description,
        updateBy            : data.update_by
    }

    if(emailpic.id){
      return this.apiService.put("/email-pic/" + emailpic.id , emailpic)
                    .pipe(map(data => data));
    }else{
      return this.apiService.post("/email-pic", emailpic)
                    .pipe(map(data => data));
    }
    
  }

  getEmailById(id: string): Observable<EmailPIC>{
    return this.apiService.get("/email-pic/" + id)
                .pipe(map(data => data));
  }

  destroyEmail(id: string): Observable<EmailPIC>{
    return this.apiService.delete("/email-pic/" + id)
                .pipe(map(data => data));
  }
}
