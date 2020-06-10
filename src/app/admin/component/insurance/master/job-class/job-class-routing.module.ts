import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { JobClassComponent }  from './job-class.component'

const routes: Routes = [
    { path: '',             component: JobClassComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class JobClassRoutingModule { }