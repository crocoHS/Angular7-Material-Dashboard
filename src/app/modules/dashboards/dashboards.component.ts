import { Component } from '@angular/core';
import { animate, group, keyframes, query, style, transition, trigger } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component( {
    selector: 'app-dashboard',
    template: `
        <section>
            <app-navbar></app-navbar>
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-grid--stretch grid-custom">
                <div class="kt-container kt-grid kt-grid--ver">
                    <div class="bg-image"></div>
                    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
                        <app-breadcrumb></app-breadcrumb>
                        <div class="kt-content kt-grid__item kt-grid__item--fluid" [@routeAnimations]="prepareRoute(outlet)">
                            <router-outlet #outlet="outlet"></router-outlet>
                        </div>
                    </div>
                </div>
            </div>
            <ngx-spinner
                class="loader"
                bdColor="rgba(0,0,0,.7)"
                size="medium"
                color="#fff"
                type="timer"
                [fullScreen]="true">
                <p style="color: white"> Please Wait... </p>
            </ngx-spinner>
        </section>
    `,
    styleUrls: [ `./dashboards.component.scss` ],
    animations: [
        trigger( 'routeAnimations', [
            transition( '* <=> *', [
                // Set a default  style for enter and leave
                query( ':enter, :leave', [
                    style( {
                        position: 'absolute',
                        width: '100%',
                    } ),
                ], { optional: true } ),
                // Animate the new page in
                /*
                    Untuk settingan ini tidak sequence, karena memakai function group
                    jika ingin sequence, langsung pakai query tanpa function group
                */
                group( [
                    query( ':leave', [
                        animate( '500ms ease', style( { opacity: 0, transform: 'scale(0.8)' } ) ),
                    ], { optional: true } ),
                    query( ':enter', [
                        animate( '500ms ease', keyframes( [
                            style( { opacity: 0, transform: 'scale(0.8)', offset: 0 } ),
                            style( { opacity: 1, transform: 'scale(1)', offset: 1 } ),
                        ] ) ),
                    ] ),
                ] )
            ] ),
        ] )
    ]
} )
export class DashboardComponent {

    constructor() {
    }

    prepareRoute( outlet: RouterOutlet ) {
        return outlet && outlet.activatedRouteData;
    }
}
