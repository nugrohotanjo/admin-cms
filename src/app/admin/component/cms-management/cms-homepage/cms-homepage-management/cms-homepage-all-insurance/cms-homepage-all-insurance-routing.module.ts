import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsHomepageAllInsuranceComponent }      from './cms-homepage-all-insurance.component';

const routes: Routes = [
    { path: '',             component: CmsHomepageAllInsuranceComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsHomepageAllInsuranceRoutingModule { }