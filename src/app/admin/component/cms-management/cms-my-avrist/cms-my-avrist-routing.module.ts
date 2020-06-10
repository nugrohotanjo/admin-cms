import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsMyAvristComponent }             from './cms-my-avrist.component';

const routes: Routes = [
    { path: '',             component: CmsMyAvristComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsMyAvristRoutingModule { }