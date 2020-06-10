import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsAboutInfluencerRoutingModule }     from "./cms-about-influencer-routing.module";

// Component
import { CmsAboutInfluencerComponent }              from "./cms-about-influencer.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsAboutInfluencerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsAboutInfluencerComponent,
  ]
})
export class CmsAboutInfluencerModule {}