import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { TermLifeProductSetupComponent }         from './term-life-product-setup.component'

const routes: Routes = [
    { path: '',             component: TermLifeProductSetupComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class TermLifeProductSetupRoutingModule { }