import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { SalesOfficerDialogComponent } from '../sales-officer-dialog/sales-officer-dialog.component';
import { SalesOfficerMigrateDialogComponent } from '../sales-officer-migrate-dialog/sales-officer-migrate-dialog.component';
import { SalesOfficer } from '../../../../../shared/models/sales-officer.model';
import { DashboardSalesOfficerService } from '../../../../../core/services/dashboard-sales-officer/dashboard-sales-officer.service';


@Component( {
    selector: 'app-sales-officer-table',
    templateUrl: './sales-officer-table.component.html',
    styleUrls: [ './sales-officer-table.component.scss' ]
} )
export class SalesOfficerTableComponent implements OnChanges {
    displayedColumns: string[] = [ 'id', 'name', 'leads', 'performance', 'salesTeam', 'status', 'action' ];
    // allCoverage: ISalesTeam[];
    click = true;
    @Input() dataFromParent: SalesOfficer[];
    dataSource = new MatTableDataSource<SalesOfficer>();
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<SalesOfficer>;
    @ViewChild( MatSort ) sort: MatSort;

    constructor( private dialog: MatDialog,
                 private http: DashboardSalesOfficerService
    ) {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    editOfficers( dataFromElement: string ) {
        const dialogRef = this.dialog.open( SalesOfficerDialogComponent, {
            maxWidth: '400px',
            width: '90vw',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: SalesOfficer ) => {
            if ( result ) {
                const index = this.dataSource.data.findIndex( val => val.id === result.id );
                const x = this.dataSource.data;
                x[ index ] = result;
                this.initTable( x );
                this.table.renderRows();
            }
        } );
    }

    migrateLeads( dataFromElement: any ) {
        dataFromElement.salesOfficers = this.dataFromParent.reduce( ( acc, cur ) => {
            if ( dataFromElement.id !== cur.id ) {
                acc.push( cur );
            }
            return acc;
        }, [] );
        const dialogRef = this.dialog.open( SalesOfficerMigrateDialogComponent, {
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: SalesOfficer ) => {
            /*if ( result ) {
                this.dataSource.data.forEach( arr => {
                    if ( arr.id === result.id ) {
                        Object.assign( arr, result );
                    }
                } );
                this.table.renderRows();
            }*/
            console.log( result );
        } );
    }

    public updateTableForParent(data: SalesOfficer) {
        const x = this.dataSource.data;
        x.push(data);
        this.initTable(x);
    }

    changeStatus( i: 'active' | 'inactive', salesOfficer: SalesOfficer ) {
        this.http.updateSalesOfficer( salesOfficer.id, { status: i } )
            .subscribe( ( value: SalesOfficer ) => {
                const index = this.dataSource.data.findIndex( val => val.id === value.id );
                this.dataSource.data[ index ].status = value.status;
                this.table.renderRows();
            } );
    }

    initTable( data: SalesOfficer[] ) {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnChanges( data: SimpleChanges ) {
        if ( data.dataFromParent.currentValue ) {
            // this.allCoverage = salesTeams;
            this.initTable( this.dataFromParent );
        }
    }

}
