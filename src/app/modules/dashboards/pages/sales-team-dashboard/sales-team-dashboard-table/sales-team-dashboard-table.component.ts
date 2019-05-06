import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { coverage, Coverage, Dummy } from '../dataDummy';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { SalesTeamDashboardDialogComponent } from '../sales-team-dashboard-dialog/sales-team-dashboard-dialog.component';

@Component( {
    selector: 'app-sales-team-dashboard-table',
    templateUrl: './sales-team-dashboard-table.component.html',
    styleUrls: [ './sales-team-dashboard-table.component.scss' ]
} )
export class SalesTeamDashboardTableComponent implements OnInit {
    displayedColumns: string[] = [ 'id', 'name', 'coverage', 'pic', 'salesOfficer', 'leads', 'channels', 'status', 'action' ];
    allCoverage: Coverage[];
    click = true;
    @Input() dataFromParent: Dummy[];
    dataSource = new MatTableDataSource<Dummy>( this.dataFromParent );
    // @ViewChild("jancok", { read: ElementRef}) jancok: ElementRef;
    // Gawe tombol klik, element binding
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

    mapping(arrAll: number[]): Coverage[] {
        return arrAll.map(val => {
            return this.allCoverage.find(obj => obj.id === val);
        });
    }

    editRow( dataFromElement: string ) {
        const dialogRef = this.dialog.open( SalesTeamDashboardDialogComponent, {
            panelClass: 'sales_team_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( result => {
            if ( result ) {
                const object = this.dataSource.data.find(obj => obj.id === result.id);
                Object.assign(this.dataSource.data, object);
                this.table.renderRows();
            }
        } );
    }
    deleteRow(id) {
        const object = this.dataSource.data.filter(obj => obj.id !== id);
        this.dataSource.data = object;
        this.table.renderRows();
    }
    bangsat() {
        this.dataFromParent.forEach(arrAll => {
            const exist = arrAll.coverage.some( el => typeof el === 'object');
            if ( !exist ) {
                return arrAll.coverage = this.mapping(arrAll.coverage);
            }
        });
    }
    ngOnInit() {
        this.allCoverage = coverage;
        this.bangsat();
        this.dataSource.data = this.dataFromParent;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

}
