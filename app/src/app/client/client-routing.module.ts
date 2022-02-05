import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./components/pages/profile/profile.component";

const routes: Routes = [
  { path: '', children: [
      { path: 'profile', component: ProfileComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule
{

}
