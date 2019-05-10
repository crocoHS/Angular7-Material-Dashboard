import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { coverage, Coverage, Dummy } from '../dataDummy';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { SalesOfficerDialogComponent } from '../sales-officer-dialog/sales-officer-dialog.component';

@Component( {
    selector: 'app-sales-officer-table',
    templateUrl: './sales-officer-table.component.html',
    styleUrls: [ './sales-officer-table.component.scss' ]
} )
export class SalesOfficerTableComponent implements OnInit {
    displayedColumns: string[] = [ 'id', 'name', 'coverage', 'pic', 'salesOfficer', 'leads', 'channels', 'status', 'action' ];
    allCoverage: Coverage[];
    click = true;
    @Input() dataFromParent: Dummy[];
    dataSource = new MatTableDataSource<Dummy>();
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<Dummy>;
    @ViewChild( MatSort ) sort: MatSort;

    constructor( private dialog: MatDialog ) {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    mapping( arrAll: number[] ): Coverage[] {
        return arrAll.map( val => {
            return this.allCoverage.find( obj => obj.id === val );
        } );
    }

    editRow( dataFromElement: string ) {
        const dialogRef = this.dialog.open( SalesOfficerDialogComponent, {
            panelClass: 'sales_officer_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: Dummy ) => {
            if ( result ) {
                this.dataSource.data.forEach( arr => {
                    if ( arr.id === result.id ) {
                        Object.assign( arr, result );
                    }
                } );
                this.table.renderRows();
                console.log( this.dataSource.data, 'jancok' );
            }
        } );
    }

    deleteRow( id ) {
        const object = this.dataSource.data.filter( obj => obj.id !== id );
        this.dataSource.data = object;
        this.table.renderRows();
    }

    bangsat() {
        this.dataFromParent.forEach( arrAll => {
            const exist = arrAll.coverage.some( el => typeof el === 'object' );
            if ( !exist ) {
                return arrAll.coverage = this.mapping( arrAll.coverage );
            }
        } );
    }

    ngOnInit() {
        this.allCoverage = coverage;
        this.bangsat();
        this.dataSource.data = this.dataFromParent;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
