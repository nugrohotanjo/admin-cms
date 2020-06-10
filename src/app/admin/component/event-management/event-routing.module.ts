import { NgModule }                         from "@angular/core"
import { RouterModule, Routes }             from "@angular/router"

import { EventManagementComponent }         from './event-management.component'
import { EventAddComponent }                from './event-add.component'
import { EventEditComponent }               from './event-edit.component'

const routes: Routes = [
    { path: '',             component: EventManagementComponent},
    { path: 'add',          component: EventAddComponent},
    { path: 'edit/:id',     component: EventEditComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class EventRoutingModule { }