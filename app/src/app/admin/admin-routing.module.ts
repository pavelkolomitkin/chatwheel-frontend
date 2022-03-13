import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {UserListPageComponent} from "./components/pages/user-list-page/user-list-page.component";
import {AdminListPageComponent} from "./components/pages/admin-list-page/admin-list-page.component";
import {CallListPageComponent} from "./components/pages/call-list-page/call-list-page.component";
import {AbuseReportListPageComponent} from "./components/pages/abuse-report-list-page/abuse-report-list-page.component";
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'users', component: UserListPageComponent },
      { path: 'admins', component: AdminListPageComponent },
      { path: 'abuse-reports', component: AbuseReportListPageComponent },
      { path: 'calls', component: CallListPageComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule
{

}
