import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { FaqComponent }  from './faq.component'

const routes: Routes = [
    { path: '',             component: FaqComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FaqRoutingModule { }