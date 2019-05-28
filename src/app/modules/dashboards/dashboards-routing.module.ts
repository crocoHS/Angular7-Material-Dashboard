import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboards.component';
import {HomeDashboardComponent} from './pages/home-dashboard/home-dashboard.component';
import {SalesTeamDashboardComponent} from './pages/sales-team-dashboard/sales-team-dashboard.component';
import {AuthGuardService} from '../../core/guards/auth-guard.service';
import {ProjectDashboardComponent} from './pages/project-dashboard/project-dashboard.component';
import {ProjectListComponent} from './pages/project-dashboard/pages/project-list/project-list.component';
import {ProjectDetailComponent} from './pages/project-dashboard/pages/project-detail/project-detail.component';
import {ProjectNewComponent} from './pages/project-dashboard/pages/project-new/project-new.component';
import {ProjectSettingComponent} from './pages/project-dashboard/pages/project-setting/project-setting.component';
import {SalesOfficerDashboardComponent} from './pages/sales-officer-dashboard/sales-officer-dashboard.component';
import {UserSettingDashboardComponent} from './pages/user-setting-dashboard/user-setting-dashboard.component';
import {ProjectSettingProductsComponent} from './pages/project-dashboard/pages/project-setting-products/project-setting-products.component';

const routes: Routes = [
    /*  TODO: WILDCARD ROUTING HARUS ADA, SEMISAL USER TIDAK SENGAJA
         KETIKA USER TIDAK SENGAJA AKSES project/setting/:id ngawur sebelum lewat list harus di
            kembalikan ke route project-list
            IKI UWES KUDUNE
    */
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: {
            breadcrumb: 'Home'
        },
        children: [
            {
                path: '',
                redirectTo: 'overview'
            },
            {
                path: 'overview',
                component: HomeDashboardComponent,
                data: {
                    breadcrumb: 'overview'
                }
            },
            {
                path: 'sales-team',
                component: SalesTeamDashboardComponent,
                data: {
                    breadcrumb: 'sales-team'
                }
            },
            {
                path: 'sales-officer',
                component: SalesOfficerDashboardComponent,
                data: {
                    breadcrumb: 'sales-officer'
                }
            },
            {
                path: 'project',
                data: {
                    breadcrumb: 'project'
                },
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
                        data: {
                            breadcrumb: 'detail'
                        }
                    },
                    {
                        path: 'new-project',
                        component: ProjectNewComponent,
                        data: {
                            breadcrumb: 'New Project'
                        }
                    },
                    {
                        path: 'setting/:id',
                        children: [
                            {
                                path: '',
                                component: ProjectSettingComponent,
                                data: {
                                    breadcrumb: 'Setting'
                                }
                            },
                            {
                                path: 'product/:prodId',
                                component: ProjectSettingProductsComponent,
                                data: {
                                    breadcrumb: 'Setting Product'
                                }
                            },
                            {
                                path: '**',
                                redirectTo: ''
                            },
                        ],
                    },
                    {
                        path: '**',
                        redirectTo: ''
                    }
                ]
            },
            {
                path: 'user-setting',
                component: UserSettingDashboardComponent,
                data: {
                    breadcrumb: 'user-setting'
                }
            },
            {
                path: '**',
                redirectTo: ''
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {
}
