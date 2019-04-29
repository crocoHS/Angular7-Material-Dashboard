import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboards.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SalesTeamDashboardComponent } from './pages/sales-team-dashboard/sales-team-dashboard.component';
import { AuthGuardService } from '../../core/guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: '',
                component: HomeDashboardComponent
            },
            {
                path: 'sales-team',
                component: SalesTeamDashboardComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
