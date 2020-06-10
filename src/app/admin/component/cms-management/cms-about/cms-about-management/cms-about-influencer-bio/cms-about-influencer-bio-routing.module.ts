import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsAboutInfluencerBioComponent }      from './cms-about-influencer-bio.component';

const routes: Routes = [
    { path: '',             component: CmsAboutInfluencerBioComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsAboutInfluencerBioRoutingModule { }