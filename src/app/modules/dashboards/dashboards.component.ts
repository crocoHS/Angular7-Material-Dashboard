import { Component } from '@angular/core';

@Component( {
    selector: 'app-dashboard',
    template: `
        <app-navbar></app-navbar>
        <a [routerLink]="['']">dashboard</a>
        <a [routerLink]="['sales-team']">sales-team</a>
        <router-outlet></router-outlet>
    `,
    styles: []
} )
export class DashboardComponent {
    constructor() {
        console.log( 'load' );
    }
}
