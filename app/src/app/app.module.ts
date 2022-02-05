import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LayoutComponent as SecurityLayoutComponent} from "./security/components/layout/layout.component";
import { LayoutComponent } from './admin/components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    SecurityLayoutComponent,
    LayoutComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
