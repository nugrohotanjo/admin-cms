import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsBenefitComponent }      from './cms-benefit.component';


const routes: Routes = [
    { path: '',             component: CmsBenefitComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsBenefitRoutingModule { }