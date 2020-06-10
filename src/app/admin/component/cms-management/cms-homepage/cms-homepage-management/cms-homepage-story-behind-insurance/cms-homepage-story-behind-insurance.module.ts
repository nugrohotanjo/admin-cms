import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsHomepageStoryBehindInsuranceRoutingModule }           from "./cms-homepage-story-behind-insurance-routing.module";

// Component
import { CmsHomepageStoryBehindInsuranceComponent }              from "./cms-homepage-story-behind-insurance.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsHomepageStoryBehindInsuranceRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsHomepageStoryBehindInsuranceComponent,
  ]
})
export class CmsHomepageStoryBehindInsuranceModule {}