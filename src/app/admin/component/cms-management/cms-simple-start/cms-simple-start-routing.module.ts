import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CmsSimpleStartComponent }      from './cms-simple-start.component';

const routes: Routes = [
    { path: '',             component: CmsSimpleStartComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CmsSimpleStartRoutingModule { }