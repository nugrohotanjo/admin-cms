import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsHomepageWhyOurProductRoutingModule }                   from "./cms-homepage-why-our-product-routing.module";

// Component
import { CmsHomepageWhyOurProductComponent }                       from "./cms-homepage-why-our-product.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsHomepageWhyOurProductRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsHomepageWhyOurProductComponent,
  ]
})
export class CmsHomepageWhyOurProductModule {}