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
import { CallListPageComponent } from './components/pages/call-list-page/call-list-page.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import {StoreModule} from "@ngrx/store";
import {reducer} from "./data/reducer";
import {EffectsModule} from "@ngrx/effects";
import {ClientUserEffects} from "./data/effects/client-user.effects";
import {ClientUserService} from "./services/client-user.service";
import {AbuseReportService} from "./services/abuse-report.service";
import {AbuseReportEffects} from "./data/effects/abuse-report.effects";


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
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([
      ClientUserEffects,
      AbuseReportEffects
    ])
  ],
  exports: [
    EffectsModule
  ],
  providers: [
    ClientUserService,
    AbuseReportService
  ]
})
export class AdminModule { }
