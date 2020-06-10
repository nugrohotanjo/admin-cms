import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ProductExclusionComponent }         from './product-exclusion.component'

const routes: Routes = [
    { path: '',             component: ProductExclusionComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ProductExclusionRoutingModule { }