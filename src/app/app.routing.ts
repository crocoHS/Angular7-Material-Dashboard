import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
    { path: 'dashboard', loadChildren: './modules/dashboards/dashboards.module#DashboardsModule' }
];

