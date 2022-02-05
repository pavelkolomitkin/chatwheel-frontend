import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent as SecurityLayoutComponent} from "./security/components/layout/layout.component";
import { LayoutComponent as ClientUserLayout } from './client/components/layout/layout.component';
import { LayoutComponent as AdminLayout } from './admin/components/layout/layout.component';

const routes: Routes = [
  { path: 'security', component: SecurityLayoutComponent, loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
  { path: 'client', component: ClientUserLayout, loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'admin', component: AdminLayout, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
