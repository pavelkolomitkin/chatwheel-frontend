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
import {SharedModule} from "../shared/shared.module";
import {LayoutComponent} from "./components/layout/layout.component";
import { RegisterSuccessComponent } from './components/pages/register-success/register-success.component';
import { SocialAuthComponent } from './components/pages/social-auth/social-auth.component';
import {VkAuthService} from "./services/vk-auth.service";

@NgModule({
  declarations: [

    LayoutComponent,

    LoginComponent,
    RestorePasswordRequestComponent,
    RestorePasswordComponent,
    RegisterComponent,
    RegisterConfirmComponent,
    RegisterSuccessComponent,
    SocialAuthComponent,

  ],
  providers: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    SecurityRoutingModule,
  ],
  exports: [
    SharedModule,
  ]
})
export class SecurityModule { }
