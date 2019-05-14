import { Component } from '@angular/core';

@Component( {
    selector: 'app-dashboard',
    template: `
        <app-navbar></app-navbar>
        <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-grid--stretch grid-custom">
            <div class="kt-container kt-grid kt-grid--ver">
                <div class="bg-image"></div>
                <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
                    <app-breadcrumb></app-breadcrumb>
                    <div class="kt-content kt-grid__item kt-grid__item--fluid">
                        <router-outlet></router-outlet>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: [ `./dashboards.component.scss` ]
} )
export class DashboardComponent {

    // TODO: Mbenakno breadcrumb

    constructor() {
    }
}
