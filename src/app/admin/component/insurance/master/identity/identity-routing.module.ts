import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { IdentityComponent }  from './identity.component'

const routes: Routes = [
    { path: '',             component: IdentityComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class IdentityRoutingModule { }