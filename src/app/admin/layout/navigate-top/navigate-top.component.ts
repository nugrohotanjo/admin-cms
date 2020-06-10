import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as SecureStorage from 'secure-web-storage'
import * as CryptoJS      from 'crypto-js'

// Shared Service
import { GetCurrentUserService } from '../../shared/service/getCurrentUser.service';

@Component({
  selector: 'app-navigate-top',
  templateUrl: './navigate-top.component.html',
  styleUrls: ['./navigate-top.component.css']
})
export class NavigateTopComponent implements OnInit {

  user : any = {
    name : null
  }

  constructor(  private router : Router,
                private getCurrentUserService         : GetCurrentUserService,) { }

  ngOnInit() {
    this.initData()
  }

  private initData() {
    const user = this.getCurrentUserService.getUserData()

    this.user.name = user.name
  }

  logout() {
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

    secureStorage.removeItem('data');
    
    this.router.navigate(['/login'])
  }

}
