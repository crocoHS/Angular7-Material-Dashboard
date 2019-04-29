import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';

@NgModule( {
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        CoreModule,
        RouterModule.forRoot(
            APP_ROUTES
        ),
        FormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [ AppComponent ]
} )
export class AppModule {
}
