import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { RenewalRechargeComponent }  from './renewal-recharge.component'

const routes: Routes = [
    { path: '',             component: RenewalRechargeComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RenewRechargeRoutingModule { }