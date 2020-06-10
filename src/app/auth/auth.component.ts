import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicScriptLoaderService }                             from '../admin/shared/service/dynamic-script.service';
import { FormGroup, FormBuilder } from '@angular/forms';

import { AuthService } from './service/auth-service/auth.service'
import { GetCurrentUserService } from '../admin/shared/service/getCurrentUser.service'
import { LogService } from '../admin/component/log-management/log.service'

import Swal                    from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';

import SecureStorage from  "secure-web-storage"
import CryptoJS from 'crypto-js'

import { environment }                          from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers : [AuthService,GetCurrentUserService]
})
export class AuthComponent implements OnInit {

  SECRET_KEY = 'secret_avrist';

  loginForm : FormGroup
  authan
  status_user  = null
  assets_url = environment.assets_url
  roleData = null;
  permissionData = null;
  cookieValue = null
  prefix              : String  = environment.prefix

  constructor(private dynamicScriptLoader           : DynamicScriptLoaderService,
              private router                        : Router,
              private fb                            : FormBuilder,
              private authService                   : AuthService,
              private cookieService                 : CookieService,
              private getCurrentUserService         : GetCurrentUserService,
              private logService                    : LogService) { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
    this.checkUserAuth()
  }

  private createForm(){
    this.loginForm = this.fb.group({
      email : [''],
      password : ['']
    })
  }

  public login() {
    const login = this.authService.attempLogin(this.loginForm.value)
                .toPromise()
                
    login.then((data) => {
      // setting new item
      this.roleData = {
        'role_id' : data.role_id
      }

      this.permissionData = data.role_id.permission
    },error => {
      switch (error.status) {
        case 500:
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
          break;

        case 404:
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'User not found with Incorect password : "'+ this.email.value +'"'
            })
          break;
      
        default:
          break;
      }
      

    })

    login.then((data) => {
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

      let orang = {
        "id"          : data.id,
        "name"        : data.name,
        "email"       : data.email,
        "role_name"   : data.role_id.name,
      }
      
      let x = {
        "user" : orang,
        "permission_data" : this.permissionData 
      }

      localStorage.setItem('ghj','xx.yy.zz')
      secureStorage.setItem('data', x);
    })

    login.then(() => {
      let user = this.getCurrentUserService.getUserData()
      
      let message   = "User " + user.name + " Login to System"
      let category  = "Login"

      const log = this.logService.storeLog(user, category, message).toPromise()

      log.then(() => {
        window.location.href = this.assets_url + 'dashboard';
      })
    })
    
  }

  private checkUserAuth() {
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

    let data = secureStorage.getItem('data');

    if(data) {
      this.router.navigate([this.prefix + '/dashboard'])
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  private loadScripts(){
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('Popper','Tooltip','Bootstrap','Nicescroll','Stisla','Scripts').then(data => {
      // Script Loaded Successfully
    }).catch(error => console.log(error));
  }
  

}
