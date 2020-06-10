import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';
import { HttpClientModule }                   from '@angular/common/http';

// Lazy Load routing
import { BannerRoutingModule }                from "./banner-routing.module";

// Component
import { BannerManagementComponent }        from "./banner-management.component";

import { NgbModule }                          from '@ng-bootstrap/ng-bootstrap';
import { BannerAddComponent } from './banner-add.component'
import { BannerEditComponent } from './banner-edit.component'


@NgModule({
  imports: [
    CommonModule,
    BannerRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  declarations: [
    BannerManagementComponent,
    BannerAddComponent,
    BannerEditComponent
  ]
})
export class BannerModule {}