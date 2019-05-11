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
    styles: [ `
        .grid-custom {
            margin-top: 80px;
        }

        .bg-image {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 350px;
            background-image: url("./assets/header.jpg");
            background-position: center top;
            background-size: 100% 350px;
        }

        .kt-content {
            padding: 0 0 30px 0;
        }
    ` ]
} )
export class DashboardComponent {

    // TODO: Mbenakno breadcrumb

    constructor() {
    }
}
