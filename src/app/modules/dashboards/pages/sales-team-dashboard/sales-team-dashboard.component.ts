import { Component, OnInit } from '@angular/core';
import { dummyAss } from './dataDummy';
import { Dummy } from '../sales-officer-dashboard/dataDummy';
import { SalesTeamDashboardDialogComponent } from './sales-team-dashboard-dialog/sales-team-dashboard-dialog.component';
import { MatDialog } from '@angular/material';
import { DashboardSalesTeamService } from '../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import { SalesTeam } from '../../../../shared/models/sales-team.model';
import { Observable } from 'rxjs';

@Component( {
    selector: 'app-sales-team-dashboard',
    templateUrl: './sales-team-dashboard.component.html',
    styleUrls: [ './sales-team-dashboard.component.scss' ]
} )
export class SalesTeamDashboardComponent implements OnInit {
    /*
    TODO: INI MASIH BELUM SAMA DENGAN DASHBOARD YANG ADA PUNYA MAS YAYAN
            Button add yo gurung onok
   */
    public dataForChildChart = {
        data: [
            { data: [ 65, 0 ], label: 'Hot' },
            { data: [ 28, 50 ], label: 'New LeadModel' },
            { data: [ 28, 0, 0, 70 ], label: 'Cold' },
            { data: [ 28, 0, 60 ], label: 'Closed' }
        ],
        label: [ 'Team Bandung', 'Team Jakarta', 'Team Surabaya', 'Team Jayapura' ]
    };
    public dataForTable: Observable<SalesTeam[]> = this.http.getAllSalesTeam();

    constructor( private dialog: MatDialog, private http: DashboardSalesTeamService ) {
    }

    addData() {
        const dialogRef = this.dialog.open( SalesTeamDashboardDialogComponent, {
            panelClass: 'sales_team_dialog'
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
