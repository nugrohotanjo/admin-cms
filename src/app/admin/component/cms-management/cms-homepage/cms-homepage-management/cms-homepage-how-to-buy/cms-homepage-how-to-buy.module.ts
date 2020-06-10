import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsHomepageHowToBuyRoutingModule }                   from "./cms-homepage-how-to-buy-routing.module";

// Component
import { CmsHomepageHowToBuyComponent }                       from "./cms-homepage-how-to-buy.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsHomepageHowToBuyRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsHomepageHowToBuyComponent,
  ]
})
export class CmsHomepageHowToBuyModule {}