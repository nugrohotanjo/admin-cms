import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsHomepageWhyOurProductComponent }      from './cms-homepage-why-our-product.component';

const routes: Routes = [
    { path: '',             component: CmsHomepageWhyOurProductComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsHomepageWhyOurProductRoutingModule { }