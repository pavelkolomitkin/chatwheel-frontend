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
import { reducer as callsReducer } from './data/calls/reducer';
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
import {UserProfileEffects} from "./data/effects/user-profile.effects";
import { ReportAbuseButtonsComponent } from './components/pages/my-profile/messages/conversation/components/report-abuse-buttons/report-abuse-buttons.component';
import {MessageSocketService} from "./services/sockets/message-socket.service";
import {UserActivitySocketService} from "./services/sockets/user-activity-socket.service";
import { MessageObserverComponent } from './components/common/message-observer/message-observer.component';
import { UserTypingComponent } from './components/pages/my-profile/messages/conversation/components/user-typing/user-typing.component';
import { UserActivityObserverComponent } from './components/common/user-activity-observer/user-activity-observer.component';
import {IncomingMessageComponent} from "./components/common/toast/incoming-message/incoming-message.component";
import {CallSocketService} from "./services/sockets/call-socket.service";
import { CallsObserverComponent } from './components/common/calls-observer/calls-observer.component';
import { DirectCallWindowComponent } from './components/common/calls/direct-call-window/direct-call-window.component';
import { IncomingDirectCallToastComponent } from './components/common/calls/incoming-direct-call-toast/incoming-direct-call-toast.component';
import {CallConnectorService} from "./services/calls/call-connector.service";
import {CallService} from "./services/call.service";

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
    ReportAbuseButtonsComponent,
    MessageObserverComponent,
    UserTypingComponent,
    UserActivityObserverComponent,
    IncomingMessageComponent,
    CallsObserverComponent,
    DirectCallWindowComponent,
    IncomingDirectCallToastComponent,
  ],
  providers: [
    ProfileService,
    UserProfileService,
    UserConversationService,
    ConversationMessageService,
    AbuseReportTypeService,
    AbuseReportService,
    CallConnectorService,

    MessageSocketService,
    UserActivitySocketService,
    CallSocketService,
    CallService,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientRoutingModule,
    StoreModule.forFeature('client', reducer),
    StoreModule.forFeature('calls', callsReducer),
    EffectsModule.forFeature([
      GeolocationEffects,
      ProfileEffects,
      ReportAbuseEffects,
      UserProfileEffects
    ]),
    NgbModalModule,
  ],

  exports: [
    EffectsModule,
  ],

  entryComponents: [
    IncomingMessageComponent
  ]
})
export class ClientModule {}
