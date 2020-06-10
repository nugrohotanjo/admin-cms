import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { EventCategoryManagementComponent } from './event-category-management.component';
import { EventCategoryAddComponent }        from './event-category-add.component';
import { EventCategoryEditComponent }       from './event-category-edit.component';


const routes: Routes = [
    { path: '',             component: EventCategoryManagementComponent},
    { path: 'add',          component: EventCategoryAddComponent},
    { path: 'edit/:id',     component: EventCategoryEditComponent}
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class EventCategoryRoutingModule { }