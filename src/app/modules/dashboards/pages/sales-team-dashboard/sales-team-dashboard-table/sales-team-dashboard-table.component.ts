import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
// import { coverage, Coverage, Dummy } from '../dataDummy';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { SalesTeamDashboardDialogComponent } from '../sales-team-dashboard-dialog/sales-team-dashboard-dialog.component';
import { SalesTeamMersaCS } from '../../../../../shared/models/sales-team.model';

@Component( {
    selector: 'app-sales-team-dashboard-table',
    templateUrl: './sales-team-dashboard-table.component.html',
    styleUrls: [ './sales-team-dashboard-table.component.scss' ]
} )
export class SalesTeamDashboardTableComponent implements OnChanges {
    displayedColumns: string[] = [ 'id', 'name', 'coverage', 'pic', 'salesOfficer', 'leads', 'channels', 'status', 'action' ];
    // allCoverage: Coverage[];
    click = true;
    @Input() dataFromParent: SalesTeamMersaCS[];
    dataSource = new MatTableDataSource<SalesTeamMersaCS>();
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<SalesTeamMersaCS>;
    @ViewChild( MatSort ) sort: MatSort;

    constructor( private dialog: MatDialog ) {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    /*mapping(arrAll: number[]): Coverage[] {
        return arrAll.map(val => {
            return this.allCoverage.find(obj => obj.id === val);
        });
    }*/

    editRow( dataFromElement: string ) {
        const dialogRef = this.dialog.open( SalesTeamDashboardDialogComponent, {
            panelClass: 'sales_team_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( result => {
            if ( result ) {
                const object = this.dataSource.data.find( obj => obj.id === result.id );
                Object.assign( this.dataSource.data, object );
                this.table.renderRows();
            }
        } );
    }
    // TODO: SUBSCRIBE BOS
    deleteRow( id ) {
        const object = this.dataSource.data.filter( obj => obj.id !== id );
        this.dataSource.data = object;
        this.table.renderRows();
    }
    changeStatus( i ) {
        this.dataSource.data[ i ].status = !this.dataSource.data[ i ].status;
    }

    /*bangsat() {
        this.dataFromParent.forEach(arrAll => {
            const exist = arrAll.coverage.some( el => typeof el === 'object');
            if ( !exist ) {
                return arrAll.coverage = this.mapping(arrAll.coverage);
            }
        });
    }*/
    ngOnChanges( data: SimpleChanges ) {
        // this.allCoverage = coverage;
        // this.bangsat();
        if ( data.dataFromParent.currentValue ) {
            this.dataSource.data = this.dataFromParent;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log( this.dataFromParent );
        }
    }

}
