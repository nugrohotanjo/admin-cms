import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { MenuManagementComponent }          from './menu-management.component'
import { MenuAddComponent }                 from './menu-add.component'
import { MenuEditComponent }                from './menu-edit.component'

const routes: Routes = [
    { path: '',             component: MenuManagementComponent},
    { path: 'add',          component: MenuAddComponent},
    { path: 'edit/:id',     component: MenuEditComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MenuRoutingModule { }