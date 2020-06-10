import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { MemberGetMemberReportComponent }      from './member-get-member-report.component';
import { MemberGetMemberDetailComponent } from './member-get-member-detail/member-get-member-detail.component'

const routes: Routes = [
    { path: '',             component: MemberGetMemberReportComponent},
    { path: 'detail/:id',   component: MemberGetMemberDetailComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MemberGetMemberReportingRoutingModule { }