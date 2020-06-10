import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { BenefitLevelManagementComponent }  from './benefit-level-management.component'

const routes: Routes = [
    { path: '',             component: BenefitLevelManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BenefitLevelRoutingModule { }