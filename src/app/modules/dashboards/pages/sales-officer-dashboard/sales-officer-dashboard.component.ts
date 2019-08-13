import { Component, OnInit, ViewChild } from '@angular/core';
import { SalesOfficerDialogComponent } from './sales-officer-dialog/sales-officer-dialog.component';
import { MatDialog } from '@angular/material';
import { DashboardSalesOfficerService } from '../../../../core/services/dashboard-sales-officer/dashboard-sales-officer.service';
import { SalesOfficer } from '../../../../shared/models/sales-officer.model';
import { Observable } from 'rxjs';
import { SalesOfficerTableComponent } from './sales-officer-table/sales-officer-table.component';

@Component( {
    selector: 'app-sales-officer-dashboard',
    templateUrl: './sales-officer-dashboard.component.html',
    styleUrls: [ './sales-officer-dashboard.component.scss' ]
} )
export class SalesOfficerDashboardComponent implements OnInit {
    /*
    TODO: - WES, Kari migrate lead
          - Ambek Chart
    */
    @ViewChild( SalesOfficerTableComponent ) tableComp: SalesOfficerTableComponent;
    public dataForChildChart = {
        data: [
            { data: [ 65, 0, 32, 23, 90 ], label: 'Hot' },
            { data: [ 28, 50 ], label: 'New LeadModel' },
            { data: [ 28, 0, 0, 70 ], label: 'Cold' },
            { data: [ 28, 0, 60 ], label: 'Closed' }
        ],
        label: [ 'Sales Officer 1', 'Sales Officer 2', 'Sales Officer 3', 'Sales Officer 4', 'Sales Officer 5' ]
    };

    public dataForTable: Observable<SalesOfficer[]>;

    constructor( private dialog: MatDialog, private http: DashboardSalesOfficerService ) {
        this.dataForTable = this.http.getAllSalesOfficers();
    }

    addData() {
        const dialogRef = this.dialog.open( SalesOfficerDialogComponent, {
            maxWidth: '400px',
            width: '90vw',
        } );
        dialogRef.afterClosed().subscribe( ( result: SalesOfficer ) => {
            if ( result ) {
                this.tableComp.updateTableForParent( result );
            }
        } );
    }

    ngOnInit() {
    }

}
