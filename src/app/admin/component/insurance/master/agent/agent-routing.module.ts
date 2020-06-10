import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { AgentComponent }  from './agent.component'


// base_url / agent / view

const routes: Routes = [
    { path: '',             component: AgentComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class AgentRoutingModule { }