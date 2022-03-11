import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthUserGuardService} from "./security/services/guards/auth-user-guard.service";
import {LayoutComponent} from "./core/components/layout/layout.component";
import {DefaultRedirectGuard} from "./security/services/guards/default-redirect-guard.service";
import {NotFoundPageComponent} from "./core/components/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      { path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule)
      },
      { path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthUserGuardService]
      },
      {
        path: '',
        canActivate: [DefaultRedirectGuard],
        pathMatch: 'full',
        children: []
      },
      {
        path: '',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
        canActivate: [AuthUserGuardService]
      },
      {
        path: '404',
        component: NotFoundPageComponent
      },
      {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
