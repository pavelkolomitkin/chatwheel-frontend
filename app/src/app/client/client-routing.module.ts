import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./components/layout/layout.component";
import {ChatwheelComponent} from "./components/pages/search/chatwheel/chatwheel.component";
import {NearbyComponent} from "./components/pages/search/nearby/nearby.component";
import {MyProfileComponent} from "./components/pages/my-profile/my-profile.component";
import {ProfileComponent as MyProfilePageComponent} from "./components/pages/my-profile/profile/profile.component";
import {MessagesComponent} from "./components/pages/my-profile/messages/messages.component";
import {CallsComponent} from "./components/pages/my-profile/calls/calls.component";
import {SettingsComponent} from "./components/pages/my-profile/settings/settings.component";
import { ProfileComponent as UserProfileComponent } from './components/pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'profile/me', component: MyProfileComponent, children: [
          { path: '', component: MyProfilePageComponent },
          { path: 'messages', component: MessagesComponent },
          { path: 'calls', component: CallsComponent },
          { path: 'settings', component: SettingsComponent }
        ] },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'chatwheel', component: ChatwheelComponent},
      { path: 'nearby', component: NearbyComponent },
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
