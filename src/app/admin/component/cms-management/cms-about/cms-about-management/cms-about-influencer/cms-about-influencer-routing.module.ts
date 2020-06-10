import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsAboutInfluencerComponent }      from './cms-about-influencer.component';

const routes: Routes = [
    { path: '',             component: CmsAboutInfluencerComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsAboutInfluencerRoutingModule { }