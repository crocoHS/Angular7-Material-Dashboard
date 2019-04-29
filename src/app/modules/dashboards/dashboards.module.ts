import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './dashboards.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SalesTeamDashboardComponent } from './pages/sales-team-dashboard/sales-team-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule( {
    declarations: [
        DashboardComponent,
        HomeDashboardComponent,
        SalesTeamDashboardComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        DashboardsRoutingModule
    ]
} )
export class DashboardsModule {
}
