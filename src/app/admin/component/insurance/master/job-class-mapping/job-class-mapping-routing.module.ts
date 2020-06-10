import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { JobClassMappingComponent }  from './job-class-mapping.component'
import { JobClassMappingDetailComponent } from './job-class-mapping-detail/job-class-mapping-detail.component'

const routes: Routes = [
    { path: '',             component: JobClassMappingComponent },
    { path: 'detail/:product_id',   component: JobClassMappingDetailComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class JobClassMappingRoutingModule { }