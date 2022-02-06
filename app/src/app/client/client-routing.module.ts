import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule
{

}
