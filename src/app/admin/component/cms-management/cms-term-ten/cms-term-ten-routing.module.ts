import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsTermTenComponent }             from './cms-term-ten.component';

const routes: Routes = [
    { path: '',             component: CmsTermTenComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsTermTenRoutingModule { }