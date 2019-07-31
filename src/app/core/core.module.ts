import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromAuth from './store/auth/auth.reducer';
import { AuthGuardService } from './guards/auth-guard.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { DashboardOverviewService } from './services/dashboard-overview/dashboard-overview.service';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import { GlobalErrorHandler } from './error/global-error-handler';
import { ApiService } from './services/api.service';
import { DashboardSalesOfficerService } from './services/dashboard-sales-officer/dashboard-sales-officer.service';
import { DashboardSalesTeamService } from './services/dashboard-sales-team/dashboard-sales-team.service';
import { DashboardProjectService } from './services/dashboard-project/dashboard-project.service';
import { ProjectStoreService } from './store/project/project-store.service';
import { DashboardProductService } from './services/dashboard-project/dashboard-product.service';
import { ApiUploadService } from './services/api-upload.service';

@NgModule( {
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        // ----------------------- NGRX store ---------------------- //
        StoreModule.forRoot( reducers, { metaReducers } ),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forFeature( 'auth', fromAuth.reducer ),
        EffectsModule.forRoot( [ AuthEffects ] ),
    ],
    providers: [
        ApiService,
        ApiUploadService,
        AuthenticationService,
        AuthGuardService,
        DashboardOverviewService,
        DashboardSalesOfficerService,
        DashboardSalesTeamService,
        DashboardProjectService,
        DashboardProductService,
        ProjectStoreService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpTokenInterceptor,
            multi: true
        }
    ]
} )
export class CoreModule {
}
