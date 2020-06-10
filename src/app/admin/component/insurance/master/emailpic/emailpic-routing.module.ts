import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { EmailpicComponent }  from './emailpic.component'

const routes: Routes = [
    { path: '',             component: EmailpicComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class EmailPicRoutingModule { }