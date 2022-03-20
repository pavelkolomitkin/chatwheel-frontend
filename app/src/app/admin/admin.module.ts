import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {LayoutComponent} from "./components/layout/layout.component";
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {SharedModule} from "../shared/shared.module";
import { UserListPageComponent } from './components/pages/user-list-page/user-list-page.component';
import { AdminListPageComponent } from './components/pages/admin-list-page/admin-list-page.component';
import { AbuseReportListPageComponent } from './components/pages/abuse-report-list-page/abuse-report-list-page.component';
import { CallListPageComponent } from './components/pages/calls-page/call-list-page/call-list-page.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import {StoreModule} from "@ngrx/store";
import {reducer} from "./data/reducer";
import {EffectsModule} from "@ngrx/effects";
import {ClientUserEffects} from "./data/effects/client-user.effects";
import {ClientUserService} from "./services/client-user.service";
import {AbuseReportService} from "./services/abuse-report.service";
import {AbuseReportEffects} from "./data/effects/abuse-report.effects";
import { UserListItemComponent } from './components/pages/user-list-page/user-list-item/user-list-item.component';
import { UserGeoLocationViewComponent } from './components/pages/user-list-page/user-geo-location-view/user-geo-location-view.component';
import { UserManagerComponent } from './components/common/user-manager/user-manager.component';
import { ClientUserProfilePageComponent } from './components/pages/client-user-profile-page/client-user-profile-page.component';
import { UserListFilterFormComponent } from './components/pages/user-list-page/user-list-filter-form/user-list-filter-form.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { ActionMenuComponent } from './components/pages/client-user-profile-page/action-menu/action-menu.component';
import { ClientProfilePageComponent } from './components/pages/client-user-profile-page/client-profile-page/client-profile-page.component';
import { ClientAbuseReportListPageComponent } from './components/pages/client-user-profile-page/client-abuse-report-list-page/client-abuse-report-list-page.component';
import { ClientReportAbuseItemComponent } from './components/pages/client-user-profile-page/client-abuse-report-list-page/client-report-abuse-item/client-report-abuse-item.component';
import { AbuseReportTypeComponent } from './components/common/abuse-report-type/abuse-report-type.component';
import { AbuseReportManagerComponent } from './components/common/abuse-report-manager/abuse-report-manager.component';
import {AdminUserEffects} from "./data/effects/admin-user.effects";
import { AdminManagerComponent } from './components/common/admin-manager/admin-manager.component';
import {AdminUserService} from "./services/admin-user.service";
import {NgxPermissionsModule} from "ngx-permissions";
import { AdminListItemComponent } from './components/pages/admin-list-page/admin-list-item/admin-list-item.component';
import { CreateAdminManagerComponent } from './components/common/admin-manager/create-admin-manager/create-admin-manager.component';
import { ResetAdminPasswordManagerComponent } from './components/common/admin-manager/reset-admin-password-manager/reset-admin-password-manager.component';
import { BlockAdminManagerComponent } from './components/common/admin-manager/block-admin-manager/block-admin-manager.component';
import { DeleteAdminManagerComponent } from './components/common/admin-manager/delete-admin-manager/delete-admin-manager.component';
import { EditAdminManagerComponent } from './components/common/admin-manager/edit-admin-manager/edit-admin-manager.component';
import {AdminUserStateSocketService} from "./services/sockets/admin-user-state-socket.service";
import { AdminListFilterFormComponent } from './components/pages/admin-list-page/admin-list-filter-form/admin-list-filter-form.component';
import { AbuseReportListFilterFormComponent } from './components/pages/abuse-report-list-page/abuse-report-list-filter-form/abuse-report-list-filter-form.component';
import { AbuseReportListItemComponent } from './components/pages/abuse-report-list-page/abuse-report-list-item/abuse-report-list-item.component';
import {AbuseReportTypeEffects} from "./data/effects/abuse-report-type.effects";
import {CallService} from "./services/call.service";
import { CallsPageComponent } from './components/pages/calls-page/calls-page.component';
import { CallListFilterFormComponent } from './components/pages/calls-page/call-list-filter-form/call-list-filter-form.component';
import { CallListItemComponent } from './components/pages/calls-page/call-list-page/call-list-item/call-list-item.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ProfileComponent,
    PageHeaderComponent,
    SideMenuComponent,
    UserListPageComponent,
    AdminListPageComponent,
    AbuseReportListPageComponent,
    CallListPageComponent,
    DashboardComponent,
    UserListItemComponent,
    UserGeoLocationViewComponent,
    UserManagerComponent,
    ClientUserProfilePageComponent,
    UserListFilterFormComponent,
    NotFoundPageComponent,
    ActionMenuComponent,
    ClientProfilePageComponent,
    ClientAbuseReportListPageComponent,
    ClientReportAbuseItemComponent,
    AbuseReportTypeComponent,
    AbuseReportManagerComponent,
    AdminManagerComponent,
    AdminListItemComponent,
    CreateAdminManagerComponent,
    ResetAdminPasswordManagerComponent,
    BlockAdminManagerComponent,
    DeleteAdminManagerComponent,
    EditAdminManagerComponent,
    AdminListFilterFormComponent,
    AbuseReportListFilterFormComponent,
    AbuseReportListItemComponent,
    CallsPageComponent,
    CallListFilterFormComponent,
    CallListItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([
      AbuseReportTypeEffects,
      ClientUserEffects,
      AbuseReportEffects,
      AdminUserEffects
    ]),
    NgxPermissionsModule,
  ],
  exports: [
    EffectsModule
  ],
  providers: [
    ClientUserService,
    AbuseReportService,
    AdminUserService,
    CallService,

    AdminUserStateSocketService
  ]
})
export class AdminModule { }
