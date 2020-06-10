import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsAboutSosmedRoutingModule }     from "./cms-about-sosmed-routing.module";

// Component
import { CmsAboutSosmedComponent }       from "./cms-about-sosmed.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsAboutSosmedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsAboutSosmedComponent,
  ]
})
export class CmsAboutSosmedModule {}