import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {AdminRoutingModule} from "./admin-routing.module";
import {LayoutComponent} from "./components/layout/layout.component";



@NgModule({
  declarations: [
    LayoutComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
