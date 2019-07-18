import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboards.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SalesTeamDashboardComponent } from './pages/sales-team-dashboard/sales-team-dashboard.component';
import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { ProjectListComponent } from './pages/project-dashboard/pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-dashboard/pages/project-detail/project-detail.component';
import { ProjectNewComponent } from './pages/project-dashboard/pages/project-new/project-new.component';
import { ProjectSettingComponent } from './pages/project-dashboard/pages/project-setting/project-setting.component';
import { SalesOfficerDashboardComponent } from './pages/sales-officer-dashboard/sales-officer-dashboard.component';
import { UserSettingDashboardComponent } from './pages/user-setting-dashboard/user-setting-dashboard.component';
import { ProjectSettingProductsComponent } from './pages/project-dashboard/pages/project-setting-products/project-setting-products.component';
import { ProfileDashboardComponent } from './pages/profile-dashboard/profile-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [ AuthGuardService ],
        children: [
            {
                path: '',
                redirectTo: 'overview'
            },
            {
                path: 'overview',
                component: HomeDashboardComponent,
            },
            {
                path: 'sales-team',
                component: SalesTeamDashboardComponent,
            },
            {
                path: 'sales-officer',
                component: SalesOfficerDashboardComponent,
            },
            {
                path: 'project',
                children: [
                    {
                        path: '',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: ProjectListComponent,
                    },
                    {
                        path: 'detail/:id',
                        component: ProjectDetailComponent,
                    },
                    {
                        path: 'new-project',
                        component: ProjectNewComponent
                    },
                    {
                        path: 'setting/:id',
                        children: [
                            {
                                path: '',
                                component: ProjectSettingComponent
                            },
                            {
                                path: 'product/:prodId',
                                component: ProjectSettingProductsComponent
                            },
                            {
                                path: '**',
                                redirectTo: ''
                            },
                        ],
                    },
                    {
                        path: 'detail',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: 'setting',
                        pathMatch: 'full',
                        redirectTo: 'list'
                    },
                    {
                        path: '**',
                        redirectTo: ''
                    }
                ]
            },
            {
                path: 'user-setting',
                component: UserSettingDashboardComponent
            },
            {
                path: 'profile',
                component: ProfileDashboardComponent
            },
            {
                path: '**',
                redirectTo: ''
            },
        ]
    }
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
} )
export class DashboardsRoutingModule {
}
