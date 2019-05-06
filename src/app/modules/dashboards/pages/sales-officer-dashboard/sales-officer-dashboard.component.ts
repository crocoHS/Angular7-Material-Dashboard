import {Component, OnInit} from '@angular/core';
import {dummyAss} from './dataDummy';

@Component({
    selector: 'app-sales-officer-dashboard',
    templateUrl: './sales-officer-dashboard.component.html',
    styleUrls: ['./sales-officer-dashboard.component.scss']
})
export class SalesOfficerDashboardComponent implements OnInit {
    public dataForChildChart = {
        data: [
            {data: [65, 0], label: 'Hot'},
            {data: [28, 50], label: 'New Lead'},
            {data: [28, 0, 0, 70], label: 'Cold'},
            {data: [28, 0, 60], label: 'Closed'}
        ],
        label: ['Team Bandung', 'Team Jakarta', 'Team Surabaya', 'Team Jayapura']
    };
    public dataForTable = dummyAss;

    constructor() {
    }

    ngOnInit() {
    }

}
