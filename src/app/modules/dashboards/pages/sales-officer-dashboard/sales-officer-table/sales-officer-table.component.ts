import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { SalesOfficerDialogComponent } from '../sales-officer-dialog/sales-officer-dialog.component';
import { SalesOfficerMigrateDialogComponent } from '../sales-officer-migrate-dialog/sales-officer-migrate-dialog.component';
import { SalesOfficer } from '../../../../../shared/models/sales-officer.model';


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

    constructor( private dialog: MatDialog ) {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    /*mapping( arrAll: number[] ): ISalesTeam[] {
        return arrAll.map( val => {
            return this.allCoverage.find( obj => obj.id === val );
        } );
    }*/

    editOfficers( dataFromElement: string ) {
        const dialogRef = this.dialog.open( SalesOfficerDialogComponent, {
            panelClass: 'sales_officer_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: SalesOfficer ) => {
            if ( result ) {
                /*this.dataSource.data.forEach( arr => {
                    if ( arr._id === result._id ) {
                        Object.assign( arr, result );
                    }
                } );*/
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

    /*
        deleteRow( id ) {
            const object = this.dataSource.data.filter( obj => obj.id !== id );
            this.dataSource.data = object;
            this.table.renderRows();
        }
    */

    changeStatus( i ) {
        this.dataSource.data[ i ].status = !this.dataSource.data[ i ].status;
    }

    // mapping sales team
    /*bangsat() {
        this.dataFromParent.forEach( arrAll => {
            const exist = arrAll.salesTeam.some( el => typeof el === 'object' );
            if ( !exist ) {
                return arrAll.salesTeam = this.mapping( arrAll.salesTeam );
            }
        } );
    }*/

    ngOnChanges(data: SimpleChanges) {
        if ( data.dataFromParent.currentValue) {
            // this.allCoverage = salesTeams;
            this.dataSource.data = this.dataFromParent;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }

}
