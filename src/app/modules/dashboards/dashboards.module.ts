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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesTeamDashboardTableComponent } from './pages/sales-team-dashboard/sales-team-dashboard-table/sales-team-dashboard-table.component';
import { SalesTeamDashboardDialogComponent } from './pages/sales-team-dashboard/sales-team-dashboard-dialog/sales-team-dashboard-dialog.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { ProjectDetailComponent } from './pages/project-dashboard/pages/project-detail/project-detail.component';
import { ProjectDetailCampaignComponent } from './pages/project-dashboard/pages/project-detail-campaign/project-detail-campaign.component';
import { ProjectDetailChannelComponent } from './pages/project-dashboard/pages/project-detail-channel/project-detail-channel.component';
import { ProjectDetailLeadComponent } from './pages/project-dashboard/pages/project-detail-lead/project-detail-lead.component';
import { ProjectListComponent } from './pages/project-dashboard/pages/project-list/project-list.component';
import { ProjectNewComponent } from './pages/project-dashboard/pages/project-new/project-new.component';
import { ProjectSettingComponent } from './pages/project-dashboard/pages/project-setting/project-setting.component';
import { SalesOfficerDashboardComponent } from './pages/sales-officer-dashboard/sales-officer-dashboard.component';
import { ProjectDetailCampaignDialogComponent } from './pages/project-dashboard/pages/project-detail-campaign/project-detail-campaign-dialog/project-detail-campaign-dialog.component';
import { ProjectDetailChannelDialogComponent } from './pages/project-dashboard/pages/project-detail-channel/project-detail-channel-dialog/project-detail-channel-dialog.component';
import { ProjectSettingProductDialogComponent } from './pages/project-dashboard/pages/project-setting/project-setting-product-dialog/project-setting-product-dialog.component';
import { ProjectSettingProductTableComponent } from './pages/project-dashboard/pages/project-setting/project-setting-product-table/project-setting-product-table.component';
import { ProjectSettingStatusTableComponent } from './pages/project-dashboard/pages/project-setting/project-setting-status-table/project-setting-status-table.component';
import { SalesOfficerDialogComponent } from './pages/sales-officer-dashboard/sales-officer-dialog/sales-officer-dialog.component';
import { SalesOfficerTableComponent } from './pages/sales-officer-dashboard/sales-officer-table/sales-officer-table.component';
import { UserSettingDashboardComponent } from './pages/user-setting-dashboard/user-setting-dashboard.component';
import { UserSettingChangeDialogComponent } from './pages/user-setting-dashboard/user-setting-change-dialog/user-setting-change-dialog.component';
import { UserSettingAddDialogComponent } from './pages/user-setting-dashboard/user-setting-add-dialog/user-setting-add-dialog.component';
import { ProjectSettingProductsComponent } from './pages/project-dashboard/pages/project-setting-products/project-setting-products.component';
import { SalesOfficerMigrateDialogComponent } from './pages/sales-officer-dashboard/sales-officer-migrate-dialog/sales-officer-migrate-dialog.component';

@NgModule( {
    declarations: [
        DashboardComponent,
        HomeDashboardComponent,
        SalesTeamDashboardComponent,
        NavbarComponent,
        BreadcrumbComponent,
        SalesTeamDashboardTableComponent,
        SalesTeamDashboardDialogComponent,
        ProjectDashboardComponent,
        ProjectDetailComponent,
        ProjectDetailCampaignComponent,
        ProjectDetailChannelComponent,
        ProjectDetailLeadComponent,
        ProjectListComponent,
        ProjectNewComponent,
        ProjectSettingComponent,
        SalesOfficerDashboardComponent,
        ProjectDetailCampaignDialogComponent,
        ProjectDetailChannelDialogComponent,
        ProjectSettingProductDialogComponent,
        ProjectSettingProductTableComponent,
        ProjectSettingStatusTableComponent,
        SalesOfficerDialogComponent,
        SalesOfficerTableComponent,
        UserSettingDashboardComponent,
        UserSettingChangeDialogComponent,
        UserSettingAddDialogComponent,
        ProjectSettingProductsComponent,
        SalesOfficerMigrateDialogComponent,
    ],
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        AppMaterialModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    entryComponents: [
        SalesTeamDashboardDialogComponent,
        SalesOfficerDialogComponent,
        SalesOfficerMigrateDialogComponent,
        ProjectDetailCampaignDialogComponent,
        ProjectDetailChannelDialogComponent,
        ProjectSettingProductDialogComponent,
        UserSettingChangeDialogComponent,
        UserSettingAddDialogComponent,
    ]
} )
export class DashboardsModule {
}
