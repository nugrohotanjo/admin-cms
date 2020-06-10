import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsMyAvristRoutingModule }                   from "./cms-my-avrist-routing.module";

// Component
import { CmsMyAvristComponent }                       from "./cms-my-avrist.component";

@NgModule({
  imports: [
    CommonModule,
    CmsMyAvristRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsMyAvristComponent
  ]
})
export class CmsMyAvristModule {}