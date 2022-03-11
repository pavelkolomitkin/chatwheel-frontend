import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./components/layout/layout.component";
import {ChatwheelComponent} from "./components/pages/search/chatwheel/chatwheel.component";
import {NearbyComponent} from "./components/pages/search/nearby/nearby.component";
import {MyProfileComponent} from "./components/pages/my-profile/my-profile.component";
import {ProfileComponent as MyProfilePageComponent} from "./components/pages/my-profile/profile/profile.component";
import {MessagesComponent} from "./components/pages/my-profile/messages/messages.component";
import {SettingsComponent} from "./components/pages/my-profile/settings/settings.component";
import { ProfileComponent as UserProfileComponent } from './components/pages/profile/profile.component';
import {ConversationComponent} from "./components/pages/my-profile/messages/conversation/conversation.component";
import {
  ConversationListPageComponent
} from "./components/pages/my-profile/messages/conversation-list-page/conversation-list-page.component";
import {PageNotFoundComponent} from "./components/pages/page-not-found/page-not-found.component";
import {SearchMapPageComponent} from "./components/pages/search/nearby/search-map-page/search-map-page.component";
import {SearchListPageComponent} from "./components/pages/search/nearby/search-list-page/search-list-page.component";
import {CallListPageComponent} from "./components/pages/my-profile/call-list-page/call-list-page.component";

export const PAGE_NOT_FOUND_ROUTE = '/404';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'profile/me', component: MyProfileComponent, children: [
          { path: '', component: MyProfilePageComponent },
          { path: 'messages', component: MessagesComponent, children: [
              { path: 'conversations', component: ConversationListPageComponent },
              { path: 'conversation/:conversationId', component: ConversationComponent },
              { path: 'conversation/user/:addresseeId', component: ConversationComponent },
              { path: '', redirectTo: 'conversations', pathMatch: 'full' }
            ]
          },
          { path: 'direct-calls', component: CallListPageComponent, data: { isDirect: true } },
          { path: 'wheel-calls', component: CallListPageComponent, data: { isDirect: false } },
          { path: 'settings', component: SettingsComponent }
        ]
      },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'chatwheel', component: ChatwheelComponent},
      { path: 'nearby', component: NearbyComponent, children: [
          { path: 'map', component: SearchMapPageComponent },
          { path: 'list', component: SearchListPageComponent },
          { path: '', redirectTo: 'map', pathMatch: 'full' }
        ]
      },
      { path: '404', component: PageNotFoundComponent },
      { path: '', redirectTo: 'chatwheel', pathMatch: 'full' },

    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule
{

}
