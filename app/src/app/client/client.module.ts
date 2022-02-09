import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from "./client-routing.module";
import {LayoutComponent} from "./components/layout/layout.component";
import {SharedModule} from "../shared/shared.module";
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ChatwheelComponent } from './components/pages/search/chatwheel/chatwheel.component';
import { NearbyComponent } from './components/pages/search/nearby/nearby.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { MessagesComponent } from './components/pages/my-profile/messages/messages.component';
import { CallsComponent } from './components/pages/my-profile/calls/calls.component';
import {ProfileComponent} from "./components/pages/my-profile/profile/profile.component";
import { EditableFieldComponent } from './components/pages/my-profile/components/editable-field/editable-field.component';
import { EditFullNameComponent } from './components/pages/my-profile/components/edit-full-name/edit-full-name.component';
import {ProfileService} from "./services/profile.service";
import { EditAboutComponent } from './components/pages/my-profile/components/edit-about/edit-about.component';
import { EditResidenceCountryComponent } from './components/pages/my-profile/components/edit-residence-country/edit-residence-country.component';
import { EditSearchCountryComponent } from './components/pages/my-profile/components/edit-search-country/edit-search-country.component';
import { EditUserPickComponent } from './components/pages/my-profile/components/edit-user-pick/edit-user-pick.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ProfileComponent,
    PageHeaderComponent,
    ChatwheelComponent,
    NearbyComponent,
    MyProfileComponent,
    MessagesComponent,
    CallsComponent,
    EditableFieldComponent,
    EditFullNameComponent,
    EditAboutComponent,
    EditResidenceCountryComponent,
    EditSearchCountryComponent,
    EditUserPickComponent,
  ],
  providers: [
    ProfileService
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
