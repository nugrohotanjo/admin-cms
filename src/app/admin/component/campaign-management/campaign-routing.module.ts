import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CampaignManagementComponent }      from './campaign-management.component';


const routes: Routes = [
    { path: '',             component: CampaignManagementComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CampaignRoutingModule { }