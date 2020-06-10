import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { MasterFormulaComponent }        from './master-formula.component';

const routes: Routes = [
    { path: '',             component: MasterFormulaComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MasterFormulaRoutingModule { }