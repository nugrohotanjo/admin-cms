import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { PaymentMethodManagementComponent }  from './payment-method-management.component'

const routes: Routes = [
    { path: '',             component: PaymentMethodManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class PaymentMethodRoutingModule { }