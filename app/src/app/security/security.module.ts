import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from "./security-routing.module";
import { LoginComponent } from './components/pages/login/login.component';
import { RestorePasswordRequestComponent } from './components/pages/restore-password-request/restore-password-request.component';
import { RestorePasswordComponent } from './components/pages/restore-password/restore-password.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RegisterConfirmComponent } from './components/pages/register-confirm/register-confirm.component';

@NgModule({
  declarations: [

    LoginComponent,
    RestorePasswordRequestComponent,
    RestorePasswordComponent,
    RegisterComponent,
    RegisterConfirmComponent,

  ],
  imports: [
    CommonModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
