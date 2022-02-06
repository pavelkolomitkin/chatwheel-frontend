import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslationLoaderService} from "../core/services/translation-loader.service";
import {environment} from "../../environments/environment";
import {FormsModule} from "@angular/forms";
import {FormFieldErrorListComponent} from "./components/forms/form-field-error-list/form-field-error-list.component";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    FormFieldErrorListComponent
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
    })
  ],
  exports: [
    FormFieldErrorListComponent,
    TranslateModule,
    FormsModule
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService)
  {
    this.translate.setDefaultLang(environment.lang);
  }
}
