import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';

export interface ILead {
    id: number;
    name: string;
    email: string;
    telephone: number;
    category: string;
    status: string;
    salesTeam: string;
    salesOfficer: string;
    campaign: string;
    channel: string;
}

@Component({
  selector: 'app-project-detail-lead-table',
  templateUrl: './project-detail-lead-table.component.html',
  styleUrls: ['./project-detail-lead-table.component.scss']
})
export class ProjectDetailLeadTableComponent implements OnChanges {
    @Input() dataFromParent: ILead[];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<ILead>;
    @ViewChild( MatSort ) sort: MatSort;
    displayedColumns: string[] = [ 'id', 'name', 'category', 'status', 'salesTeam', 'salesOfficer', 'campaign', 'channel' ];
    dataSource;

    constructor() {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnChanges( data: SimpleChanges ) {
        if ( data[ 'dataFromParent' ].currentValue) {
            this.dataSource = new MatTableDataSource<ILead>();
            this.dataSource.data = this.dataFromParent;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }
}
