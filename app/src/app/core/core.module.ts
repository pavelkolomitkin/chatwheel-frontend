import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseApiUrlInterceptor} from "./services/interceptors/base-api-url.interceptor";
import {DefaultHttpHeadersInterceptor} from "./services/interceptors/default-http-headers.interceptor";
import {LocalStorageService} from "./services/local-storage.service";
import {NgxPermissionsModule} from "ngx-permissions";
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslationLoaderService} from "./services/translation-loader.service";
import {environment} from "../../environments/environment";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
// import {AuthTokenInjectorInterceptor} from "./services/interceptors/auth-token-injector.interceptor";
// import {ErrorResponseHandlerInterceptor} from "./services/interceptors/error-response-handler.interceptor";

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BaseApiUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultHttpHeadersInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInjectorInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorResponseHandlerInterceptor, multi: true },
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([])
  ],
  providers: [
    httpInterceptorProviders,
    LocalStorageService
  ],
  exports: [
    NgxPermissionsModule,
    StoreModule,
    EffectsModule
  ]
})
export class CoreModule {}
