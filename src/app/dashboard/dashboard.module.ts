import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeDashboardComponent } from './welcome-dashboard/welcome-dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";



@NgModule({
  declarations: [WelcomeDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
