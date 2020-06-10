import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { BenefitManagementComponent }  from './benefit-management.component'

const routes: Routes = [
    { path: '',             component: BenefitManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BenefitRoutingModule { }