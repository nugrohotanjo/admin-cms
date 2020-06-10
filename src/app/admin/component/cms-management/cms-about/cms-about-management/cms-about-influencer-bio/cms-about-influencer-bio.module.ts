import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsAboutInfluencerBioRoutingModule }     from "./cms-about-influencer-bio-routing.module";

// Component
import { CmsAboutInfluencerBioComponent }              from "./cms-about-influencer-bio.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsAboutInfluencerBioRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsAboutInfluencerBioComponent,
  ]
})
export class CmsAboutInfluencerBioModule {}