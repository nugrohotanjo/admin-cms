import { Injectable } from '@angular/core';

import SecureStorage from  "secure-web-storage"
import CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class GetCurrentUserService {

  a : any = null

  constructor() { }

  getUserData() {
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
  
  this.a = secureStorage.getItem('data');
  
  return this.a.user
  }

  
}
