import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsClaimComponent }      from './cms-claim.component';


const routes: Routes = [
    { path: '',             component: CmsClaimComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsClaimRoutingModule { }