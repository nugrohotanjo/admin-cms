import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { EpolicyDeliveryComponent }      from './epolicy-delivery.component';

const routes: Routes = [
    { path: '',             component: EpolicyDeliveryComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class EpolicyDeliveryRoutingModule { }