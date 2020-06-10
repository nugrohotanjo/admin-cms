import { NgModule }                                     from "@angular/core"
import { RouterModule, Routes }                         from "@angular/router"

import { MemberGetMemberManagementComponent }           from './member-get-member-management.component'
import { MemberGetMemberAddComponent }                  from './member-get-member-add.component'
import { MemberGetMemberEditComponent }                 from './member-get-member-edit.component'

const routes: Routes = [
    { path: '',             component: MemberGetMemberManagementComponent},
    { path: 'add',          component: MemberGetMemberAddComponent},
    { path: 'edit/:id',     component: MemberGetMemberEditComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MemberGetMemberRoutingModule { }