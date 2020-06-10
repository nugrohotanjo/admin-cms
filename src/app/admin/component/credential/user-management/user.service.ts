// Core
import { Injectable }               from '@angular/core';

// Model
import { User }                     from './user';

// Service
import { ApiService }               from '../../../shared/service/api.service';

// Dependency Injection RxJs
import { Observable }               from 'rxjs';
import { map }                      from 'rxjs/operators';
import { randomString }             from '../../../shared/helper/randomString'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private apiService : ApiService) { }

  getUsers(): Observable<User[]>{
    return this.apiService.get("/users")
                      .pipe(map(data => data));
  }

  getUserById(id: String): Observable<User>{
    return this.apiService.get("/user/" + id)
                      .pipe(map(data => data));
  }

  saveUser(data): Observable<User>{
    const user = {
      name : data.name,
      email : data.email,
      password : randomString(12),
      role_id : {
              id : parseInt(data.role)
            }
    }

    return this.apiService.post("/user", user)
                  .pipe(map(data => data));
  }

  updateUser(id, user): Observable<User>{

    const Data = {
      name : user.name,
      email : user.email,
      password : user.password,
      role_id : {
              "id" : parseInt(user.role),
              "permissions" : null
            }
    }
    return this.apiService.put("/user/update/"+id, Data)
                  .pipe(map(data => data));
  } 

  destroyUser(id: string): Observable<User>{
    return this.apiService.delete("/user/delete/" + id)
                .pipe(map(data => data));
  }
}
