import { NgModule }                             from "@angular/core";
import { CommonModule }                         from '@angular/common';
import { HttpClientModule }                     from '@angular/common/http';
import { ReactiveFormsModule }                  from '@angular/forms';

// Lazy Load routing
import { CmsMyAvristBannerRoutingModule }       from "./cms-my-avrist-banner-routing.module";

// Component
import { CmsMyAvristBannerComponent }           from "./cms-my-avrist-banner.component";
import { NgxEditorModule }                      from 'ngx-editor';
import { SortablejsModule }                     from 'ngx-sortablejs';

@NgModule({
  imports: [
    CommonModule,
    CmsMyAvristBannerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SortablejsModule,
    NgxEditorModule
  ],
  declarations: [
    CmsMyAvristBannerComponent,
  ]
})
export class CmsMyAvristBannerModule {}