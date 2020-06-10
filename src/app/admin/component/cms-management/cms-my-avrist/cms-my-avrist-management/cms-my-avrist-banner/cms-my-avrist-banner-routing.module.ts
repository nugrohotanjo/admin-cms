import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsMyAvristBannerComponent }      from './cms-my-avrist-banner.component';

const routes: Routes = [
    { path: '',             component: CmsMyAvristBannerComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsMyAvristBannerRoutingModule { }