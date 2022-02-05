import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from "./components/pages/login/login.component";
import {
  RestorePasswordRequestComponent
} from "./components/pages/restore-password-request/restore-password-request.component";
import {RestorePasswordComponent} from "./components/pages/restore-password/restore-password.component";
import {RegisterComponent} from "./components/pages/register/register.component";
import {RegisterConfirmComponent} from "./components/pages/register-confirm/register-confirm.component";


const routes: Routes = [
  {
    path: '', children: [
      { path: 'login', component: LoginComponent},
      { path: 'restore-password-request', component: RestorePasswordRequestComponent },
      { path: 'restore-password/:key', component: RestorePasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'register-confirm/:key', component: RegisterConfirmComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule
{

}
