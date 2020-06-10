import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ProductArchivedRoutingModule }            from "./product-archived-routing.modules";

// Component
import { ProductArchivedComponent }             from "./product-archived.component";

@NgModule({
  imports: [
    CommonModule,
    ProductArchivedRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ProductArchivedComponent
  ]
})
export class ProductArchivedModule {}