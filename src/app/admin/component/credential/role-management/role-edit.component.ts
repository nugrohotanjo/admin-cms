import { FormBuilder, Validators, FormGroup }                             from '@angular/forms';
import { Component, OnInit }                                              from '@angular/core';
import { Router, ActivatedRoute  }                                        from '@angular/router';

// Environtment
import { environment }                                                    from 'src/environments/environment';

// Model
import  { Permission }                                                    from '../../permission/permission';

// Service
import { RoleService }                          from './role.service';
import { PermissionService }                    from '../../permission/permission.service';
import { GetCurrentUserService }                from '../../../shared/service/getCurrentUser.service'
import { LogService }                           from '../../../component/log-management/log.service'
// import { saveAs } from 'file-saver'; 

// SharedService
import { SweetalertService }                                              from '../../../shared/service/sweetalert.service';


@Component({
  selector: 'app-role-edit',
  templateUrl: './pages/role-edit.component.html',
  styleUrls: ['./pages/role-edit.component.css'],
  providers: [ RoleService , PermissionService ,SweetalertService]
})
export class RoleEditComponent implements OnInit {

  editRole            : FormGroup;
  permissionList      : Permission[];
  selectedPermission  : Permission[];
  prefix              : String = environment.prefix

  constructor(  private fb                            : FormBuilder, 
                private roleService                   : RoleService, 
                private permissionService             : PermissionService, 
                private route                         : ActivatedRoute,
                private router                        : Router,
                private sweetalertService             : SweetalertService,
                private getCurrentUserService         : GetCurrentUserService,
                private logService                    : LogService ) 
  { 
    this.createForm()
    this.initPermission()
    this.initValue()
  }

  ngOnInit() { }

  public updateRole(){
    this.route.params.subscribe(params => {
        return this.roleService.updateRole(params['id'], this.editRole.value)
                      .subscribe(() => {
                          this.sweetalertService.yourWorkHasBeenSaved('Role Has Been Updated')

                          let user = this.getCurrentUserService.getUserData()
      
                          let message   = "User " + user.name + " Edit a Role"
                          let category  = "Role"
                    
                          const log = this.logService.storeLog(user, category, message).toPromise()

                          log.then(() => {
                            this.router.navigate([this.prefix + '/roles'])
                          })

                        });
      });
  }

  private initValue(){
      this.route.params.subscribe(params => {
        return this.roleService.getRoleById(params['id'])
                    .subscribe((data) => {
                      this.editRole.setValue({
                          id: data.id,
                          name: data.name,
                          description: data.description,
                          selectedPermission : data.permission
                        });
                    })
      })
  }

  private createForm(){
    this.editRole = this.fb.group({
              id                    : [''],
              name                  : ['', Validators.compose([ Validators.required,
                                              Validators.minLength(4)])],
              description           : [''],
              selectedPermission    : ['']
    });
  }

  private initPermission(){
    this.permissionService.getAllPermission()
                            .subscribe((data) => {
                                this.permissionList = data
                            });
  }

}
