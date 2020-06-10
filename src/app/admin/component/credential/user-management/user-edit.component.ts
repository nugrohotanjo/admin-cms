// Core
import { Component, OnInit }                        from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { ActivatedRoute, Router }                           from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { RoleService }                              from '../role-management/role.service';
import { UserService }                              from './user.service';

// Model
import { Role }                                     from '../role-management/role';
import { SweetalertService }                        from '../../../shared/service/sweetalert.service';
import { MustMatch }                                from '../../../shared/helper/mustMartch';


@Component({
  selector: 'app-user-edit',
  templateUrl: './pages/user-edit.component.html',
  styleUrls: ['./pages/user-edit.component.css'],
  providers: [RoleService,UserService,SweetalertService]
})
export class UserEditComponent implements OnInit {

  editUser      : FormGroup;
  Roles         : Role[];
  show_password : boolean;
  show_confirm  : boolean;
  RoleUser      : any;

  prefix        : String = environment.prefix

  constructor(private fb                    : FormBuilder, 
              private roleService           : RoleService,
              private route                 : ActivatedRoute,
              private router                : Router,
              private userService           : UserService,
              private sweetalertService     : SweetalertService) 
  { 
    this.show_password  = false;
    this.show_confirm   = false;
    this.createForm();
    this.getAllRole();
    this.initValue();
  }

  private createForm(){
    this.editUser = this.fb.group({
          id                    : [''],
          name                  : ['', Validators.required],
          email                 : ['', [Validators.required, Validators.email]],
          role                  : ['', [Validators.required]],
          password              : ['', [Validators.minLength(8)]],
          password_confirmation : ['', ]
      },{
        validator: MustMatch('password', 'password_confirmation')
      });
  }

  private initValue(){
    this.route.params.subscribe(params => {
      return this.userService.getUserById(params['id'])
                  .subscribe((data) => {
                    this.editUser.setValue({
                        id                      : data.id,
                        name                    : data.name,
                        email                   : data.email,
                        password                : null,
                        password_confirmation   : null,
                        role                    : data.role_id.id
                      })
                  })
    })
  }

  private getAllRole(){
    this.roleService.getRoles()
                    .subscribe(
                        data      => this.Roles = data,
                        error     => console.log("error", error)
                      )
  }

  public updateUser(){
    this.route.params.subscribe(params => {
        return this.userService.updateUser(params['id'], this.editUser.value)
                          .subscribe((data) => {
                            this.sweetalertService.yourWorkHasBeenSaved('User Has Been Updated')
                            this.router.navigate([this.prefix + '/users'])
                          })
    })
  }

  ngOnInit() {
  }

  public showPassword(){
    this.show_password = !this.show_password;
  }

  public showConfirm(){
    this.show_confirm = !this.show_confirm;
  }

  // getter Form 
  get name(){
    return this.editUser.get('name');
  }
  get email(){
    return this.editUser.get('email');
  }
  get role(){
    return this.editUser.get('role');
  }
  get password(){
    return this.editUser.get('password');
  }
  get password_confirmation(){
    return this.editUser.get('password_confirmation');
  }

}
