import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { BookingPolicyComponent }      from './booking-policy.component';


const routes: Routes = [
    { path: '',             component: BookingPolicyComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BookingPolicyRoutingModule { }