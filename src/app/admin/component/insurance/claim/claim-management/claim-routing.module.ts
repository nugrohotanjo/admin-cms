import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ClaimManagementComponent }  from './claim-management.component'
import { ClaimDetailComponent } from '../claim-detail/claim-detail.component'

const routes: Routes = [
    { path: '',             component: ClaimManagementComponent},
    { path: 'view/:id',     component: ClaimDetailComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ClaimRoutingModule { }