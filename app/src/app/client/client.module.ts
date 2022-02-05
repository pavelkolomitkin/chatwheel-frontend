import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/pages/profile/profile.component';
import {ClientRoutingModule} from "./client-routing.module";

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
