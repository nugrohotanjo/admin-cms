import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsAboutSosmedComponent }      from './cms-about-sosmed.component';

const routes: Routes = [
    { path: '',             component: CmsAboutSosmedComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsAboutSosmedRoutingModule { }