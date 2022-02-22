import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseApiUrlInterceptor} from "./services/interceptors/base-api-url.interceptor";
import {DefaultHttpHeadersInterceptor} from "./services/interceptors/default-http-headers.interceptor";
import {LocalStorageService} from "./services/local-storage.service";
import {NgxPermissionsModule} from "ngx-permissions";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { reducer as coreReducer } from './data/reducer';
import { reducer as securityReducer } from '../security/data/reducer';
import {GlobalProgressComponent} from "./components/global-progress/global-progress.component";
import {AuthUserGuardService} from "../security/services/guards/auth-user-guard.service";
import {DefaultRedirectGuard} from "../security/services/guards/default-redirect-guard.service";
import { LayoutComponent } from './components/layout/layout.component';
import {RouterModule} from "@angular/router";
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import {appInitializeHandler, ApplicationInitializerService} from "./services/application-initializer.service";
import {AuthTokenInjectorInterceptor} from "./services/interceptors/auth-token-injector.interceptor";
import {ErrorResponseHandlerInterceptor} from "./services/interceptors/error-response-handler.interceptor";
import {AppInitEffect} from "./data/effects/app-init.effect";
import {AuthEffects} from "../security/data/effects/auth.effects";
import {SecurityService} from "../security/services/security.service";
import {ProfileService} from "../security/services/profile.service";
import {RegisterEffects} from "../security/data/effects/register.effects";
import { MessageNotifierComponent } from './components/message-notifier/message-notifier.component';
import {CountryService} from "./services/country.service";
import {UploadFileService} from "./services/upload/upload-file.service";
import {UploadUserPictureEffects} from "./data/effects/upload-user-picture.effects";
import {UserPictureService} from "./services/user-picture.service";
import {GeoLocationDeviceService} from "./services/geo-location-device.service";
import {UserMediaService} from "./services/user-media.service";
import {UploadDataService} from "./services/upload/upload-data.service";
import {AbuseReportTypeService} from "./services/abuse-report-type.service";


const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseHandlerInterceptor, multi: true },
];

@NgModule({
  declarations: [
    GlobalProgressComponent,
    LayoutComponent,
    NotFoundPageComponent,
    MessageNotifierComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({
      core: coreReducer,
      security: securityReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      RegisterEffects,
      AppInitEffect,
      UploadUserPictureEffects
    ]),
    RouterModule
  ],
  providers: [
    httpInterceptorProviders,
    UploadFileService,
    LocalStorageService,
    AuthUserGuardService,
    DefaultRedirectGuard,
    CountryService,
    SecurityService,
    ProfileService,
    UserPictureService,
    GeoLocationDeviceService,
    UserMediaService,
    UploadDataService,
    AbuseReportTypeService,
    ApplicationInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializeHandler,
      deps: [ApplicationInitializerService],
      multi: true
    }
  ],
  exports: [
    NgxPermissionsModule,
    StoreModule,
    EffectsModule,

    GlobalProgressComponent,
    LayoutComponent,
    NotFoundPageComponent,
    MessageNotifierComponent,
  ]
})
export class CoreModule {}
