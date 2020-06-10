import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsHomepageOurProductComponent }      from './cms-homepage-our-product.component';


const routes: Routes = [
    { path: '',             component: CmsHomepageOurProductComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsHomepageOurProductRoutingModule { }