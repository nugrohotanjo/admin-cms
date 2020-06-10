import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule , FormsModule }  from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { SinglePageRouting }                  from "./single-page-routing.module";

// Component
import { SinglePageComponent }                from "./single-page.component";
import { SinglePageAddComponent }             from "./single-page-add.component";
import { SinglePageEditComponent }            from "./single-page-edit.component";

import { NgxEditorModule }                      from 'ngx-editor';
import { TooltipModule }                        from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    SinglePageRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    TooltipModule
  ],
  declarations: [
    SinglePageComponent,
    SinglePageAddComponent,
    SinglePageEditComponent
  ]
})
export class SinglePageModule {}