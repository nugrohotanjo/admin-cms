import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ProvinceComponent }  from './province.component'

const routes: Routes = [
    { path: '',             component: ProvinceComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ProvinceRoutingModule { }