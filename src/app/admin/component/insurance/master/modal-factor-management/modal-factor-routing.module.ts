import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ModalFactorManagementComponent }  from './modal-factor-management.component'

const routes: Routes = [
    { path: '',             component: ModalFactorManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ModalFactorRoutingModule { }