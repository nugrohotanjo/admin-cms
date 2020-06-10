import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsHomepageComponent }      from './cms-homepage.component';


const routes: Routes = [
    { path: '',             component: CmsHomepageComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsHomepageRoutingModule { }