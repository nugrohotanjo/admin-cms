import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ProductApprovalComponent }  from './product-approval.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'

const routes: Routes = [
    { path: '',             component: ProductApprovalComponent},
    { path: 'detail/:id',             component: ProductDetailComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ProductApprovalRoutingModule { }