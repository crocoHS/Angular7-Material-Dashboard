import {Component} from '@angular/core';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {RouterOutlet} from '@angular/router';

@Component({
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
    styleUrls: [`./dashboards.component.scss`],
    animations: [
        trigger('routeAnimations', [
            transition('* <=> *', [
                // Set a default  style for enter and leave
                query(':enter, :leave', [
                    style({
                        position: 'absolute',
                        left: 0,
                        width: '100%',
                        opacity: 0,
                        transformOrigin: 'right',
                        transform: 'translateX(100%)',
                    }),
                ]),
                // Animate the new page in
                query(':enter', [
                    animate('300ms ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
                ]),
            ]),
        ])
    ]
})
export class DashboardComponent {

    // TODO: Mbenakno breadcrumb .. iki uwes

    constructor() {
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData;
    }
}
