import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsAboutRoutingModule }                   from "./cms-about-routing.module";

// Component
import { CmsAboutComponent }                       from "./cms-about.component";

@NgModule({
  imports: [
    CommonModule,
    CmsAboutRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsAboutComponent
  ]
})
export class CmsAboutModule {}