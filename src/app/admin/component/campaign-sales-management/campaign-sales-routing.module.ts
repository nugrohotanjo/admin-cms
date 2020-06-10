import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CampaignSalesManagementComponent }      from './campaign-sales.component';

const routes: Routes = [
    { path: '',             component: CampaignSalesManagementComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CampaignSalesRoutingModule { }