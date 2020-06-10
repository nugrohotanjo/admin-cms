import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsSimpleStartRoutingModule }                   from "./cms-simple-start-routing.module";

// Component
import { CmsSimpleStartComponent }                       from "./cms-simple-start.component"

@NgModule({
  imports: [
    CommonModule,
    CmsSimpleStartRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsSimpleStartComponent
  ]
})
export class CmsMyAvristModule {}