import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { IntegrationPolicyMasterComponent }  from './integration-policy-master.component'

const routes: Routes = [
    { path: '',             component: IntegrationPolicyMasterComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class IntegrationPolicyMasterRoutingModule { }