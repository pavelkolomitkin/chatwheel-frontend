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
import {MultiLinePipe} from "./pipes/multi-line.pipe";
import {TextTrimPipe} from "./pipes/text-trim.pipe";
import {MomentModule} from "ngx-moment";
import {DateTimeViewComponent} from "./components/date-time-view/date-time-view.component";
import { AlertWindowComponent } from './components/alert-window/alert-window.component';
import { MapPinGroupComponent } from './components/geo/map-pin-group/map-pin-group.component';
import {ImageUrlPipe} from "./pipes/image-url.pipe";
import {MapLocationViewComponent} from "./components/geo/map-location-view/map-location-view.component";
import {PaginatorComponent} from "./components/paginator/paginator.component";

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    FooterComponent,
    UserAvatarComponent,
    EditableUserAvatarComponent,
    MapComponent,
    UserMapMarkComponent,
    MapComponentBaseComponent,
    DateTimeViewComponent,
    UserActivityStatusDirective,
    MultiLinePipe,
    TextTrimPipe,
    ImageUrlPipe,
    AlertWindowComponent,
    MapPinGroupComponent,
    MapLocationViewComponent,
    PaginatorComponent
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
    InfiniteScrollModule,
    MomentModule
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
    DateTimeViewComponent,
    AlertWindowComponent,
    MapLocationViewComponent,
    PaginatorComponent,

    UserActivityStatusDirective,
    MultiLinePipe,
    TextTrimPipe,
    ImageUrlPipe,
    MomentModule,
  ],

  entryComponents: [
    MapPinGroupComponent
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService)
  {
    this.translate.setDefaultLang(environment.lang);
  }
}
