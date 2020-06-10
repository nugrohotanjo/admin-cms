import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { LogManagementComponent }      from './log-management.component';
import { LogDetailComponent } from './log-detail/log-detail.component'

const routes: Routes = [
    { path: '',             component: LogManagementComponent},
    { path: 'detail/:id',   component: LogDetailComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class LogRoutingModule { }