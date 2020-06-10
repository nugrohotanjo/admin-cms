import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsAboutBannerComponent }      from './cms-about-banner.component';

const routes: Routes = [
    { path: '',             component: CmsAboutBannerComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsAboutBannerRoutingModule { }