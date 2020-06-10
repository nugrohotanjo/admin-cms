// Core
import { FormBuilder, Validators, FormGroup }   from '@angular/forms';
import { Component, OnInit }                    from '@angular/core';
import { Router }                               from "@angular/router";

// Environtment
import { environment }                          from 'src/environments/environment';

// Model
import  {Permission}                            from '../../permission/permission';

// Service
import { RoleService }                          from './role.service';
import { PermissionService }                    from '../../permission/permission.service';
import { GetCurrentUserService }                from '../../../shared/service/getCurrentUser.service'
import { LogService }                           from '../../../component/log-management/log.service'

// SharedService
import { SweetalertService }                    from '../../../shared/service/sweetalert.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './pages/role-add.component.html',
  styleUrls: ['./pages/role-add.component.css'],
  providers: [RoleService, PermissionService, SweetalertService]
})
export class RoleAddComponent implements OnInit {
  
  addRole             : FormGroup;
  permissionList      : Permission[];
  slug                : any;
  prefix              : String = environment.prefix

  constructor(  private fb                            : FormBuilder, 
                private roleService                   : RoleService, 
                private permissionService             : PermissionService,
                private router                        : Router,
                private sweetalertService             : SweetalertService,
                private getCurrentUserService         : GetCurrentUserService,
                private logService                    : LogService ) 
  { 
    this.createForm()
    this.initPermission()
  }

  ngOnInit() { }

  public createRole(){
    this.roleService.saveRole(this.addRole.value)
                      .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Role Has Been Save')

                          let user = this.getCurrentUserService.getUserData()
      
                          let message   = "User " + user.name + " Add new Role"
                          let category  = "Role"
                    
                          const log = this.logService.storeLog(user, category, message).toPromise()

                          log.then(() => {
                            this.router.navigate([this.prefix + '/roles'])
                          })
                          
                      });
  }

  private createForm(){
    this.addRole = this.fb.group({
      name                      : ['', [Validators.required, Validators.minLength(4)]],
      description               : ['',[Validators.required]],
      selectedPermission        : ['',[Validators.required]]
    });
  }

  private initPermission(){
    this.permissionService.getAllPermission()
                            .subscribe((data) => {
                                this.permissionList = data
                            });
  }

  get name(){
    return this.addRole.get('name')
  }

  get description(){
    return this.addRole.get('description')
  }

  get selectedPermission(){
    return this.addRole.get('selectedPermission')
  }

}
