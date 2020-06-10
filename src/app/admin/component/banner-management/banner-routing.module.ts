import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { BannerManagementComponent }        from './banner-management.component';
import { BannerAddComponent }               from './banner-add.component'
import { BannerEditComponent }              from './banner-edit.component'

const routes: Routes = [
    { path: '',             component: BannerManagementComponent},
    { path: 'add',          component: BannerAddComponent},
    { path: 'edit/:id',     component: BannerEditComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BannerRoutingModule { }