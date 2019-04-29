import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';

@Component( {
    selector: 'app-home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: [ './home-dashboard.component.scss' ]
} )
export class HomeDashboardComponent implements OnInit {
    constructor( private store: Store<AppState> ) {
    }
    // Gawe Test tok
    arrayOne(n: number): any[] {
        return Array(n);
    }

    ngOnInit() {
    }

}
