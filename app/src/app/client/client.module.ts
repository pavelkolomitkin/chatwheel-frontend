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
import {ProfileComponent as MyProfilePageComponent} from "./components/pages/my-profile/profile/profile.component";
import { ProfileComponent as UserProfileComponent } from './components/pages/profile/profile.component';
import { EditableFieldComponent } from './components/pages/my-profile/components/editable-field/editable-field.component';
import { EditFullNameComponent } from './components/pages/my-profile/components/edit-full-name/edit-full-name.component';
import {ProfileService} from "./services/profile.service";
import { EditAboutComponent } from './components/pages/my-profile/components/edit-about/edit-about.component';
import { EditResidenceCountryComponent } from './components/pages/my-profile/components/edit-residence-country/edit-residence-country.component';
import { EditSearchCountryComponent } from './components/pages/my-profile/components/edit-search-country/edit-search-country.component';
import { EditUserPickComponent } from './components/pages/my-profile/components/edit-user-pick/edit-user-pick.component';
import { EditInterestsComponent } from './components/pages/my-profile/components/edit-interests/edit-interests.component';
import {EffectsModule} from "@ngrx/effects";
import {GeolocationEffects} from "./data/effects/geolocation.effects";
import { TextLocationViewComponent } from './components/pages/profile/components/geo-location/text-location-view/text-location-view.component';
import { TextLocationViewComponent as TextMyLocationViewComponent } from './components/pages/my-profile/components/geo-location/text-location-view/text-location-view.component';
import {StoreModule} from "@ngrx/store";
import { reducer } from './data/reducer';
import { MapLocationViewComponent } from './components/pages/profile/components/geo-location/map-location-view/map-location-view.component';
import { CameraProfilePictureGrabberWindowComponent } from './components/common/camera-profile-picture-grabber-window/camera-profile-picture-grabber-window.component'
import {NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { CameraProfilePictureGrabberComponent } from './components/common/camera-profile-picture-grabber/camera-profile-picture-grabber.component';
import { SettingsComponent } from './components/pages/my-profile/settings/settings.component';
import {ProfileEffects} from "./data/effects/profile.effects";
import {UserProfileService} from "./services/user-profile.service";
import { UserInterestsViewComponent } from './components/pages/profile/components/user-interests-view/user-interests-view.component';
import { SelectedCountryViewComponent } from './components/pages/profile/components/selected-country-view/selected-country-view.component';
import { EditMapLocationComponent } from './components/pages/my-profile/components/geo-location/edit-map-location/edit-map-location.component';
import { ConversationComponent } from './components/pages/my-profile/messages/conversation/conversation.component';
import { MessageListItemComponent } from './components/pages/my-profile/messages/conversation/components/message-list-item/message-list-item.component';
import { ConversationUserInputComponent } from './components/pages/my-profile/messages/conversation/components/conversation-user-input/conversation-user-input.component';
import { ConversationListPageComponent } from './components/pages/my-profile/messages/conversation-list-page/conversation-list-page.component';
import { ActionMenuComponent } from './components/pages/profile/components/action-menu/action-menu.component';
import {UserConversationService} from "./services/user-conversation.service";
import {
  ConversationListItemComponent
} from "./components/pages/my-profile/messages/conversation-list-page/conversation-list-item/conversation-list-item.component";
import {ConversationMessageService} from "./services/conversation-message.service";
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { ReportAbuseComponent } from './components/common/report-abuse-listener/report-abuse/report-abuse.component';
import { ReportAbuseListenerComponent } from './components/common/report-abuse-listener/report-abuse-listener.component';
import {AbuseReportTypeService} from "../core/services/abuse-report-type.service";
import {ReportAbuseEffects} from "./data/effects/report-abuse.effects";
import {AbuseReportService} from "./services/abuse-report.service";

@NgModule({
  declarations: [
    LayoutComponent,
    MyProfilePageComponent,
    PageHeaderComponent,
    ChatwheelComponent,
    NearbyComponent,
    MyProfileComponent,
    UserProfileComponent,
    MessagesComponent,
    CallsComponent,
    EditableFieldComponent,
    EditFullNameComponent,
    EditAboutComponent,
    EditResidenceCountryComponent,
    EditSearchCountryComponent,
    EditUserPickComponent,
    EditInterestsComponent,
    TextLocationViewComponent,
    TextMyLocationViewComponent,
    MapLocationViewComponent,
    CameraProfilePictureGrabberWindowComponent,
    CameraProfilePictureGrabberComponent,
    SettingsComponent,
    UserInterestsViewComponent,
    SelectedCountryViewComponent,
    EditMapLocationComponent,
    ConversationComponent,
    MessageListItemComponent,
    ConversationUserInputComponent,
    ConversationListPageComponent,
    ActionMenuComponent,
    ConversationListItemComponent,
    PageNotFoundComponent,
    ReportAbuseComponent,
    ReportAbuseListenerComponent,


  ],
  providers: [
    ProfileService,
    UserProfileService,
    UserConversationService,
    ConversationMessageService,
    AbuseReportTypeService,
    AbuseReportService
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    StoreModule.forFeature('client', reducer),
    EffectsModule.forFeature([
      GeolocationEffects,
      ProfileEffects,
      ReportAbuseEffects
    ]),
    NgbModalModule,
  ],

  exports: [
    EffectsModule
  ]
})
export class ClientModule {}
