import { NgModule }                         from "@angular/core";
import { RouterModule, Routes }             from "@angular/router";

import { SinglePageComponent }              from './single-page.component';
import { SinglePageAddComponent }           from './single-page-add.component';
import { SinglePageEditComponent }          from './single-page-edit.component';

const routes: Routes = [
    { path: '',             component: SinglePageComponent},
    { path: 'add',          component: SinglePageAddComponent},
    { path: 'edit/:id',     component: SinglePageEditComponent},
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class SinglePageRouting { }