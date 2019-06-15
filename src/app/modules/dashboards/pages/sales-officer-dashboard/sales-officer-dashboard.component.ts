import {Component, OnInit} from '@angular/core';
import {Dummy, dummyAss} from './dataDummy';
import {SalesOfficerDialogComponent} from './sales-officer-dialog/sales-officer-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-sales-officer-dashboard',
    templateUrl: './sales-officer-dashboard.component.html',
    styleUrls: ['./sales-officer-dashboard.component.scss']
})
export class SalesOfficerDashboardComponent implements OnInit {
    /*
    TODO: - IKI YO SEK NGEBUG
          - Dialog integrate with sales team
    */
    public dataForChildChart = {
        data: [
            {data: [65, 0, 32, 23, 90], label: 'Hot'},
            {data: [28, 50], label: 'New Lead'},
            {data: [28, 0, 0, 70], label: 'Cold'},
            {data: [28, 0, 60], label: 'Closed'}
        ],
        label: ['Sales Officer 1', 'Sales Officer 2', 'Sales Officer 3', 'Sales Officer 4', 'Sales Officer 5']
    };
    public dataForTable = dummyAss;

    constructor( private dialog: MatDialog ) {
    }

    addData( ) {
        const dialogRef = this.dialog.open( SalesOfficerDialogComponent, {
            panelClass: 'sales_officer_dialog'
        } );
        dialogRef.afterClosed().subscribe( ( result: Dummy ) => {
            // if ( result ) {
            //     this.dataSource.data.forEach( arr => {
            //         if ( arr.id === result.id ) {
            //             Object.assign( arr, result );
            //         }
            //     } );
            //     this.table.renderRows();
            //     console.log( this.dataSource.data, 'jancok' );
            // }
        } );
    }

    ngOnInit() {
    }

}
