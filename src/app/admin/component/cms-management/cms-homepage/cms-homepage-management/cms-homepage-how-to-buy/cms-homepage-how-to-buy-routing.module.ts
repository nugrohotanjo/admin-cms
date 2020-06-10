import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsHomepageHowToBuyComponent }      from './cms-homepage-how-to-buy.component';

const routes: Routes = [
    { path: '',             component: CmsHomepageHowToBuyComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsHomepageHowToBuyRoutingModule { }