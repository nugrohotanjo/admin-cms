import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { Joboccupation2Component }          from './joboccupation2.component'

const routes: Routes = [
    { path: '',             component: Joboccupation2Component},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class JobOccupation2RoutingModule { }