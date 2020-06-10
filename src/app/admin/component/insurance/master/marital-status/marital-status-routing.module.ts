import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { MaritalStatusComponent }           from './marital-status.component'

const routes: Routes = [
    { path: '',             component: MaritalStatusComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MaritalStatusRoutingModule { }