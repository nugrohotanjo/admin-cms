import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsHomepageAllInsuranceRoutingModule }     from "./cms-homepage-all-insurance-routing.module";

// Component
import { CmsHomepageAllInsuranceComponent }         from "./cms-homepage-all-insurance.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsHomepageAllInsuranceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsHomepageAllInsuranceComponent,
  ]
})
export class CmsHomepageAllInsuranceModule {}