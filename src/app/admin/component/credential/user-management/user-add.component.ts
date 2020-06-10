// Core
import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';

// Environtment
import { environment }                                            from 'src/environments/environment';

// Service
import { RoleService }                        from '../role-management/role.service';
import { UserService }                        from './user.service';

// Model
import { Role }                               from '../role-management/role';

// Shared Service
import { SweetalertService }                  from '../../../shared/service/sweetalert.service';
// Shared Helper
import { MustMatch }                          from '../../../shared/helper/mustMartch';


@Component({
  selector: 'app-user-add',
  templateUrl: './pages/user-add.component.html',
  styleUrls: ['./pages/user-add.component.css'],
  providers: [RoleService,UserService]
})
export class UserAddComponent implements OnInit {

  constructor(private fb                : FormBuilder, 
              private roleService       : RoleService,
              private userService       : UserService,
              private router            : Router,
              private sweetalertService : SweetalertService,) 
  { 
    this.show_confirm   = false;
    this.createForm();
    this.getAllRole();
  }

  show_confirm  : boolean;
  addUser       : FormGroup;
  Roles         : Role[];
  prefix        : String = environment.prefix

  ngOnInit() {
  }

  public createUser() {
    this.userService.saveUser(this.addUser.value)
              .subscribe( data =>  {
                this.sweetalertService.yourWorkHasBeenSaved('User Has Been Save')
                this.router.navigate([this.prefix + '/users'])
              },(err) => {
                console.log(err)
              });
  }

  private createForm(){
    this.addUser = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(4)]],
          email: ['', [Validators.required, Validators.email]],
          role: ['', [Validators.required]]
      });
  }

  private getAllRole(){
    this.roleService.getRoles()
                    .subscribe(
                        data      => this.Roles = data,
                        error     => console.log("error", error)
                      );
  }

  public showConfirm(){
    this.show_confirm = !this.show_confirm;
  }

  // getter Form 
  get name(){
    return this.addUser.get('name');
  }
  get email(){
    return this.addUser.get('email');
  }
  get role(){
    return this.addUser.get('role');
  }
  get password_confirmation(){
    return this.addUser.get('password_confirmation');
  }

}
