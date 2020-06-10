import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { CurrencyComponent }  from './currency.component'

const routes: Routes = [
    { path: '',             component: CurrencyComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CurrencyRoutingModule { }