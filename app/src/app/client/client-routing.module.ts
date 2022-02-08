import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./components/layout/layout.component";
import {ChatwheelComponent} from "./components/pages/search/chatwheel/chatwheel.component";
import {NearbyComponent} from "./components/pages/search/nearby/nearby.component";
import {MyProfileComponent} from "./components/pages/my-profile/my-profile.component";
import {ProfileComponent} from "./components/pages/my-profile/profile/profile.component";
import {MessagesComponent} from "./components/pages/my-profile/messages/messages.component";
import {CallsComponent} from "./components/pages/my-profile/calls/calls.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'profile', component: MyProfileComponent, children: [
          { path: '', component: ProfileComponent },
          { path: 'messages', component: MessagesComponent },
          { path: 'calls', component: CallsComponent }
        ] },
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
