import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { TxtPaymentComponent }  from './txt-payment.component'

const routes: Routes = [
    { path: '',             component: TxtPaymentComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class TxtPaymentRoutingModule { }