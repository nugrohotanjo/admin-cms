import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { RelationshipBeneficiaryComponent }  from './relationship-beneficiary.component'

const routes: Routes = [
    { path: '',             component: RelationshipBeneficiaryComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RelationshipBeneficiaryRoutingModule { }