import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardComponent } from './dashboards.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SalesTeamDashboardComponent } from './pages/sales-team-dashboard/sales-team-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { AppMaterialModule } from '../../app-material.module';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule( {
    declarations: [
        DashboardComponent,
        HomeDashboardComponent,
        SalesTeamDashboardComponent,
        NavbarComponent,
        BreadcrumbComponent
    ],
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        AppMaterialModule,
        SharedModule,
        ReactiveFormsModule,
    ]
} )
export class DashboardsModule {
}
