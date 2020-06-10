import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { NgxPermissionsService } from 'ngx-permissions';

// Service
import { UserService } from '../../component/credential/user-management/user.service'
import { ProductCategoryService } from '../../component/insurance/product/product-category/product-category.service'

import * as SecureStorage from 'secure-web-storage'
import * as CryptoJS      from 'crypto-js'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [NgxPermissionsService]
})
export class SidebarComponent implements AfterViewInit {

  prefix            = `${environment.prefix}`;
  objPermission     = null;
  listPermission    = null;
  perm              = []
  ListCategory      = []
  
  constructor(private permissionsService      : NgxPermissionsService,
              private userService             : UserService,
              private productCategoryService  : ProductCategoryService) {}

  ngAfterViewInit() {

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

    if (z.permission_data){
      this.listPermission = z.permission_data
    }

    for (let i in this.listPermission)
    {
      this.perm.push(this.listPermission[i].slug); 
    }

    this.permissionsService.loadPermissions(this.perm);

    this.loadCategory()
  }

  protected loadCategory() {
    this.productCategoryService.getAll()
            .subscribe(data => this.ListCategory = data)
  }

}
