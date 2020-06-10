import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsHomepageStoryBehindInsuranceComponent }      from './cms-homepage-story-behind-insurance.component';

const routes: Routes = [
    { path: '',             component: CmsHomepageStoryBehindInsuranceComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsHomepageStoryBehindInsuranceRoutingModule { }