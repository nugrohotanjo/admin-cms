import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsTermTenRoutingModule }                   from "./cms-term-ten-routing.module";

// Component
import { CmsTermTenComponent }                       from "./cms-term-ten.component"

@NgModule({
  imports: [
    CommonModule,
    CmsTermTenRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsTermTenComponent
  ]
})
export class CmsTermTenModule {}