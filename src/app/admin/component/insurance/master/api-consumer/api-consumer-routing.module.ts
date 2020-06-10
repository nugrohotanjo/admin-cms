import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { ApiConsumerComponent }  from './api-consumer.component'
import { ApiConsumerDetailComponent } from './api-consumer-detail/api-consumer-detail.component'

const routes: Routes = [
    { path: '',             component: ApiConsumerComponent},
    { path: 'detail/:id',   component: ApiConsumerDetailComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class ApiConsumerRoutingModule { }