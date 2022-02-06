import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './components/pages/login/login.component';
import { RestorePasswordRequestComponent } from './components/pages/restore-password-request/restore-password-request.component';
import { RestorePasswordComponent } from './components/pages/restore-password/restore-password.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RegisterConfirmComponent } from './components/pages/register-confirm/register-confirm.component';
import {SecurityService} from './services/security.service';
import {ProfileService} from './services/profile.service';
import {StoreModule} from "@ngrx/store";
import {reducer} from "./data/reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./data/effects/auth.effects";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [

    LoginComponent,
    RestorePasswordRequestComponent,
    RestorePasswordComponent,
    RegisterComponent,
    RegisterConfirmComponent,

  ],
  providers: [
    SecurityService,
    ProfileService
  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,

    StoreModule.forFeature('security', reducer),
    EffectsModule.forFeature([
      AuthEffects
    ])
  ],
  exports: [
    SharedModule,
    StoreModule,
    EffectsModule,
  ]
})
export class SecurityModule { }
