import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

// Environtment
import { environment }                      from 'src/environments/environment'

// Component
import { PermissionManagementComponent }          from './permission-management.component';

const routes: Routes = [
    { 
        path            : '',             
        component       : PermissionManagementComponent,
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class PermissionRoutingModule { }