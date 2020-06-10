import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { RiderManagementComponent }         from './rider-management.component'

const routes: Routes = [
    { path: '',             component: RiderManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RiderManagementRoutingModule { }