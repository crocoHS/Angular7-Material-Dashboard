import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';
import { DashboardOverviewService } from '../../../../core/services/dashboard-overview/dashboard-overview.service';
import * as moment from 'moment';

@Component( {
    selector: 'app-home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: [ './home-dashboard.component.scss' ]
} )
export class HomeDashboardComponent implements OnInit {
    public dataForChart1$;

    constructor( private store: Store<AppState>, private http: DashboardOverviewService ) {
    }

    bangsat() {
        const jancok = this.dataForChart1$.reduce( (acc, date) => {
            const yearWeek = moment(date.date).year() + '-' + moment(date.date).month() + '-' + moment(date.date).date();
            // check if the week number exists
            if (typeof acc[yearWeek] === 'undefined') {
                acc[yearWeek] = [];
            }
            acc[yearWeek].push(date);
            return acc;
        }, {});
        console.log(jancok);
    }

    ngOnInit() {
        this.http.getDataLocal().subscribe(val => this.dataForChart1$ = val);
    }

}
