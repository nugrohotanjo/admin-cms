import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ProductExclusionRoutingModule }                 from "./product-exclusion-routing.module";

// Component
import { ProductExclusionComponent }            from "./product-exclusion.component";

// Library
import { NgxEditorModule }                      from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    ProductExclusionRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule
  ],
  declarations: [
    ProductExclusionComponent
  ]
})
export class ProductExclusionModule {}