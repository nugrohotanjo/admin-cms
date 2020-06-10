import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { ProductApprovalRoutingModule }            from "./product-approval-routing.module";

// Component
import { ProductApprovalComponent }      from "./product-approval.component";

import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ProductApprovalRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    ProductApprovalComponent,
    ProductDetailComponent
  ]
})
export class ProductApprovalModule {}