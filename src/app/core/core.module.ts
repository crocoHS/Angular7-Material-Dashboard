import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromAuth from './store/auth/auth.reducer';
import { AuthGuardService } from './guards/auth-guard.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule( {
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,

        // ----------------------- NGRX store ---------------------- //
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreModule.forFeature('auth', fromAuth.reducer),
        EffectsModule.forRoot([AuthEffects]),
    ],
    providers: [
        AuthenticationService,
        AuthGuardService,
    ]
} )
export class CoreModule {
}
