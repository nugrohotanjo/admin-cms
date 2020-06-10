import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { CustomerManagementComponent }         from './customer-management.component'

const routes: Routes = [
    { path: '',             component: CustomerManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CustomerRoutingModule { }