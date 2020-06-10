import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { VisitorComponent }          from './visitor.component'
import { VisitorDetailComponent } from './visitor-detail/visitor-detail.component'

const routes: Routes = [
    { path: '',             component: VisitorComponent},
    { path: 'detail/:id',      component: VisitorDetailComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class VisitorRoutingModule { }