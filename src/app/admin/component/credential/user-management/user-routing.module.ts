import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

// Environtment
import { environment }                      from '../../../../../environments/environment'

// Component
import { UserManagementComponent }          from './user-management.component';
import { UserAddComponent }                 from './user-add.component';
import { UserEditComponent }                from './user-edit.component';

// Package
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
    { 
        path            : '',             
        component       : UserManagementComponent,
        canActivate     : [NgxPermissionsGuard],
        data            : {
            permissions : {
              only      : 'view-user',
              redirectTo: 'users'
            }
        }
    },
    { 
        path            : 'add',          
        component       : UserAddComponent,
        canActivate     : [NgxPermissionsGuard],
        data            : {
            permissions : {
              only      : 'add-user',
              redirectTo: `${environment.prefix}`
            }
        }
    },
    { 
        path            : 'edit/:id',     
        component       : UserEditComponent,
        canActivate     : [NgxPermissionsGuard],
        data            : {
            permissions : {
              only      : 'edit-user',
              redirectTo: `${environment.prefix}`
            }
        }
    },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule { }