import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { ProductCategoryRoutingModule }         from "./product-category-routing.module";

// Component
import { ProductCategoryComponent }               from "./product-category.component";

import { NgbModule }                          from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    ProductCategoryComponent
  ]
})
export class ProductCategoryModule {}