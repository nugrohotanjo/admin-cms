import {Injectable}                         from '@angular/core';

import * as SecureStorage from 'secure-web-storage'
import * as CryptoJS      from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class ListPermissionService {


  constructor() { }

    getListPermission() {
        var secureStorage = new SecureStorage(localStorage, {
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

        let z = secureStorage.getItem('data');

        return z
    }
}
