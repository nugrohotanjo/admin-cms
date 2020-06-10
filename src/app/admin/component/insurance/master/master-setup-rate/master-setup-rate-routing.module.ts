import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { MasterSetupRateComponent }  from './master-setup-rate.component'

const routes: Routes = [
    { path: '',             component: MasterSetupRateComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MasterSetupRateRoutingModule { }