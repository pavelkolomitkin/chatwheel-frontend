import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslationLoaderService} from "../core/services/translation-loader.service";
import {environment} from "../../environments/environment";
import {FormsModule} from "@angular/forms";
import {FormFieldErrorListComponent} from "./components/forms/form-field-error-list/form-field-error-list.component";
import {FooterComponent} from "./components/footer/footer.component";
import { UserAvatarComponent } from './components/pictures/user-avatar/user-avatar.component';
import { EditableUserAvatarComponent } from './components/pictures/editable-user-avatar/editable-user-avatar.component';
import { LightboxModule } from 'ngx-lightbox';
import { MapComponent } from './components/geo/map/map.component';
import { UserMapMarkComponent } from './components/geo/user-map-mark/user-map-mark.component';
import { MapComponentBaseComponent } from './components/geo/map-component-base/map-component-base.component';
import {RouterModule} from "@angular/router";
import { UserActivityStatusDirective } from './directives/user-activity-status.directive';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    FooterComponent,
    UserAvatarComponent,
    EditableUserAvatarComponent,
    MapComponent,
    UserMapMarkComponent,
    MapComponentBaseComponent,
    UserActivityStatusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationLoaderService
      },
      useDefaultLang: true
    }),
    LightboxModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    LightboxModule,
    InfiniteScrollModule,

    FooterComponent,
    UserAvatarComponent,
    EditableUserAvatarComponent,
    FormFieldErrorListComponent,
    MapComponent,

    UserActivityStatusDirective
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService)
  {
    this.translate.setDefaultLang(environment.lang);
  }
}
