import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { BankComponent }  from './bank.component'

const routes: Routes = [
    { path: '',             component: BankComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BankRoutingModule { }