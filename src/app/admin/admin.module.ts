import { NgModule }                           from "@angular/core";
import { CommonModule }                       from '@angular/common';
import { ReactiveFormsModule }                from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Lazy Load routing
import { AdminRoutingModule }                from "./admin-routing.module";

// Component
import { AdminComponent }           from "./admin.component";
import { NavigateTopComponent }     from './layout/navigate-top/navigate-top.component'
import { SidebarComponent }         from './layout/sidebar/sidebar.component';
import { MainComponent }            from './layout/main/main.component';
import { FooterComponent }          from './layout/footer/footer.component';

// Package
import { NgxPermissionsModule }       from 'ngx-permissions';
import { KeysPipe }                   from './shared/pipe/keys.pipe';

import { LoadingBarModule }             from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule }   from '@ngx-loading-bar/http-client';
import { NgxEditorModule }              from 'ngx-editor';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    LoadingBarHttpClientModule,
    NgxEditorModule,
  ],
  declarations: [
    AdminComponent,
    NavigateTopComponent,
    SidebarComponent,
    FooterComponent,
    MainComponent,
    KeysPipe
  ],
  providers: []
})
export class AdminModule {}