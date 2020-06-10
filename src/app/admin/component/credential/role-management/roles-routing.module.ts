import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

// Environtment
import { environment }                      from '../../../../../environments/environment'

import { RoleManagementComponent }          from './role-management.component';
import { RoleAddComponent }                 from './role-add.component';
import { RoleEditComponent }                from './role-edit.component';

// Package
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
    {   path: '',             
        component: RoleManagementComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
              only: 'view-role',
              redirectTo: `${environment.prefix}`
            }
        }
    },
    {   path: 'add',          
        component: RoleAddComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
              only: 'add-role',
              redirectTo: `${environment.prefix}`
            }
        }
    },
    { 
        path: 'edit/:id',     
        component: RoleEditComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
            permissions: {
              only: 'edit-role',
              redirectTo: `${environment.prefix}`
            }
        }
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RolesRoutingModule { }