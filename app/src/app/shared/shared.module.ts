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

@NgModule({
  declarations: [
    FormFieldErrorListComponent,
    FooterComponent,
    UserAvatarComponent,
    EditableUserAvatarComponent,
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
    LightboxModule
  ],
  exports: [
    TranslateModule,
    FormsModule,
    LightboxModule,

    FooterComponent,
    UserAvatarComponent,
    EditableUserAvatarComponent,
    FormFieldErrorListComponent,
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService)
  {
    this.translate.setDefaultLang(environment.lang);
  }
}
