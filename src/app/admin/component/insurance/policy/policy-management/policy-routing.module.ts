import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { PolicyManagementComponent }  from './policy-management.component'

const routes: Routes = [
    { path: '',             component: PolicyManagementComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class PolicyRoutingModule { }