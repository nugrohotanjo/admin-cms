import { NgModule }                 from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }         from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { BrowserModule }            from '@angular/platform-browser';
import { BrowserAnimationsModule }            from '@angular/platform-browser/animations';

// Global Service
import { SweetalertService }          from './admin/shared/service/sweetalert.service';
import { ApiService }                 from './admin/shared/service/api.service';
import { CmsCarouselPositionService } from './admin/shared/service/cmscarouselposition.service';
import { XRequestService }            from './admin/shared/service/xrequest.service';
import { GetCurrentUserService }      from './admin/shared/service/getCurrentUser.service'
import { AuthService }                from './auth/service/auth-service/auth.service';
import { DynamicScriptLoaderService } from './admin/shared/service/dynamic-script.service';
import { SlugifyPipe }                from './admin/shared/pipe/slugify.pipe';
import { ImageUploadComponent }       from './admin/shared/component/image-upload/image-upload.component';
import { CookieService } from 'ngx-cookie-service';
import { WINDOW_PROVIDERS } from "./admin/shared/service/window.service";
import { ListPermissionService } from './admin/shared/service/permission.service'


// Mother Component
import { AuthComponent }              from './auth/auth.component';

// Auth
import { TokenInterceptorService } from './auth/token-interceptor.service';

// import { HomepageComponent } from './client/component/homepage/homepage.component'
// import { SortablejsModule } from 'ngx-sortablejs';
import { DragulaModule } from 'ng2-dragula';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DragulaModule.forRoot(),
    RouterModule
    // SortablejsModule
  ],
  providers: [
      SweetalertService, 
      ListPermissionService,
      ApiService,
      CmsCarouselPositionService,
      XRequestService,
      AuthService, 
      DynamicScriptLoaderService, 
      SlugifyPipe, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
      },
      CookieService,
      GetCurrentUserService,
      WINDOW_PROVIDERS,
      // { provide: APP_BASE_HREF, useValue: '/' },
      // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
