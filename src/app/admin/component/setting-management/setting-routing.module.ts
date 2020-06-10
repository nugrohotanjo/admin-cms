import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { SettingManagementComponent }          from './setting-management.component';

const routes: Routes = [
    { path: '',             component: SettingManagementComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class SettingRoutingModule { }