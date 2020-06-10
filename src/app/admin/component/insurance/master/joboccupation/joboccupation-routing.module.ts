import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { JoboccupationComponent }  from './joboccupation.component'

const routes: Routes = [
    { path: '',             component: JoboccupationComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class JobOccupationRoutingModule { }