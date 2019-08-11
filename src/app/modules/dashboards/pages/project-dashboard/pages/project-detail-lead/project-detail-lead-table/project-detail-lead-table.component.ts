import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Lead } from '../../../../../../../shared/models/lead.model';

@Component( {
    selector: 'app-project-detail-lead-table',
    templateUrl: './project-detail-lead-table.component.html',
    styleUrls: [ './project-detail-lead-table.component.scss' ]
} )
export class ProjectDetailLeadTableComponent implements OnChanges {
    @Input() dataFromParent: Lead[];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<Lead>;
    @ViewChild( MatSort ) sort: MatSort;
    displayedColumns: string[] = [ 'id', 'name', 'category', 'status', 'salesTeam', 'salesOfficer', 'campaign', 'channel' ];
    dataSource: MatTableDataSource<Lead>;

    constructor() {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnChanges( data: SimpleChanges ) {
        if ( data.dataFromParent.currentValue ) {
            this.dataSource = new MatTableDataSource<Lead>();
            this.dataSource.data = this.dataFromParent;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }
}
