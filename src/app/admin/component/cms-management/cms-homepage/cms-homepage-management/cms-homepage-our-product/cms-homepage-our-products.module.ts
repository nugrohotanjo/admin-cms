import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsHomepageOurProductRoutingModule }                   from "./cms-homepage-our-product-routing.module";

// Component
import { CmsHomepageOurProductComponent }                       from "./cms-homepage-our-product.component";

@NgModule({
  imports: [
    CommonModule,
    CmsHomepageOurProductRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    CmsHomepageOurProductComponent,
    CmsHomepageOurProductComponent
  ]
})
export class CmsHomepageOurProductModule {}