import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {UserListPageComponent} from "./components/pages/user-list-page/user-list-page.component";
import {AdminListPageComponent} from "./components/pages/admin-list-page/admin-list-page.component";
import {CallListPageComponent} from "./components/pages/calls-page/call-list-page/call-list-page.component";
import {AbuseReportListPageComponent} from "./components/pages/abuse-report-list-page/abuse-report-list-page.component";
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";
import {
  ClientUserProfilePageComponent
} from "./components/pages/client-user-profile-page/client-user-profile-page.component";
import {NotFoundPageComponent} from "./components/pages/not-found-page/not-found-page.component";
import {
  ClientAbuseReportListPageComponent
} from "./components/pages/client-user-profile-page/client-abuse-report-list-page/client-abuse-report-list-page.component";
import {
  ClientProfilePageComponent
} from "./components/pages/client-user-profile-page/client-profile-page/client-profile-page.component";
import {CallsPageComponent} from "./components/pages/calls-page/calls-page.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users/:id', component: ClientUserProfilePageComponent, children: [
          { path: 'profile', component: ClientProfilePageComponent },
          { path: 'abuse-reports', component: ClientAbuseReportListPageComponent },
          { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ] },
      { path: 'users', component: UserListPageComponent },
      { path: 'admins', component: AdminListPageComponent },
      { path: 'abuse-reports', component: AbuseReportListPageComponent },
      { path: 'calls', component: CallsPageComponent, children: [
          { path: 'chat-wheel', component: CallListPageComponent, data: { isDirect: false } },
          { path: 'direct', component: CallListPageComponent, data: { isDirect: true } },
          { path: '', redirectTo: 'chat-wheel', pathMatch: 'full' }
        ] },
      { path: '404', component: NotFoundPageComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: '404', pathMatch: 'full' }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule
{

}
