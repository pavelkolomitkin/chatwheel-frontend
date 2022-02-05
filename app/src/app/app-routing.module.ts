import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent as SecurityLayoutComponent} from "./security/components/layout/layout.component";
import { LayoutComponent as ClientUserLayout } from './client/components/layout/layout.component';

const routes: Routes = [
  { path: 'security', component: SecurityLayoutComponent, loadChildren: './security/security.module#SecurityModule' },
  { path: 'client', component: ClientUserLayout, loadChildren: './client/client.module#ClientModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
