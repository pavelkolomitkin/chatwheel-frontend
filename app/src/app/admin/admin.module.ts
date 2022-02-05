import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {AdminRoutingModule} from "./admin-routing.module";



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
