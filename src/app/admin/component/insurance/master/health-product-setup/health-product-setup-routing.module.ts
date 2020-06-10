import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { HealthProductSetupComponent }  from './health-product-setup.component'

const routes: Routes = [
    { path: '',             component: HealthProductSetupComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class HealthProductSetupRoutingModule { }