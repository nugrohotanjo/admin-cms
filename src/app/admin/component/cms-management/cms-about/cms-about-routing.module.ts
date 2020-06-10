import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsAboutComponent }      from './cms-about.component';

const routes: Routes = [
    { path: '',             component: CmsAboutComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsAboutRoutingModule { }