import { Injectable }       from '@angular/core';

// Service
import { ApiService }       from '../../../admin/shared/service/api.service';

// Dependency Injection RxJs
import { Observable }       from 'rxjs';
import { map }              from 'rxjs/operators';
import { User } from '../../../admin/component/credential/user-management/user';

import SecureStorage from  "secure-web-storage"
import CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  b = null

  constructor(private apiService        : ApiService) { }

  attempLogin(data): Observable<User> {
    let user = {
      "email" : data.email,
      "password" : data.password
    }
    return this.apiService.post("/user/login", user)
                    .pipe(map(data => data))
  }

  loggedIn() {

    let secureStorage = new SecureStorage(localStorage, {
      hash: function hash(key) {
          key = CryptoJS.SHA256(key, 'secret_avrist');
      
          return key.toString();
      },
      encrypt: function encrypt(data) {
          data = CryptoJS.AES.encrypt(data, 'secret_avrist');
      
          data = data.toString();
      
          return data;
      },
      decrypt: function decrypt(data) {
          data = CryptoJS.AES.decrypt(data, 'secret_avrist');
      
          data = data.toString(CryptoJS.enc.Utf8);
      
          return data;
      }
    });

    this.b = secureStorage.getItem('data');
    
    if(this.b != null) {
      if(this.b.permission_data) return true;
      
      return false;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('ghj')
  }
  
}
