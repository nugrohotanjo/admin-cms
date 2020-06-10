import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ProductArchivedComponent }         from './product-archived.component'

const routes: Routes = [
    { path: '',                         component: ProductArchivedComponent },
    { path: 'detail/:id',               component: ProductArchivedComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ProductArchivedRoutingModule { }