import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { CtaComponent }      from './cta.component';
import { CtaDetailComponent } from './cta-detail/cta-detail.component'

const routes: Routes = [
    { path: '',             component: CtaComponent },
    { path: 'detail/:id',   component: CtaDetailComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class CtaRoutingModule { }