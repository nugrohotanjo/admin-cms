import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { RelationshipComponent }  from './relationship.component'

const routes: Routes = [
    { path: '',             component: RelationshipComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RelationshipRoutingModule { }