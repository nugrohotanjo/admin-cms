import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsHomepageRoutingModule }                   from "./cms-homepage-routing.module";

// Component
import { CmsHomepageComponent }                       from "./cms-homepage.component";

@NgModule({
  imports: [
    CommonModule,
    CmsHomepageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsHomepageComponent
  ]
})
export class CmsHomepageModule {}