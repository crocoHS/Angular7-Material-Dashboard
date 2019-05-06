import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ProjectDetailCampaignDialogComponent } from './project-detail-campaign-dialog/project-detail-campaign-dialog.component';

export interface ICampaign {
    id: number;
    image: string;
    name: string;
    channels: number;
    leads: number;
    detail: string;
    status: boolean;
}

const dataDummyCampaign: ICampaign[] = [
    {
        id: 21,
        image: 'kosongansek.img',
        name: 'Black Campaign',
        channels: 3,
        leads: 423,
        detail: 'Sek Gak Paham',
        status: true
    },
    {
        id: 22,
        image: 'kosongansek.img',
        name: 'White Campaign',
        channels: 2,
        leads: 523,
        detail: 'Sek Gak Paham Pindo',
        status: true
    }
];

@Component( {
    selector: 'app-project-detail-campaign',
    templateUrl: './project-detail-campaign.component.html',
    styleUrls: [ './project-detail-campaign.component.scss' ]
} )
export class ProjectDetailCampaignComponent implements OnInit {
    // Nanti ini dipakai bersama OnChanges
    // @Input() dataFromParent: ICampaign[];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<ICampaign>;
    @ViewChild( MatSort ) sort: MatSort;
    displayedColumns: string[] = [ 'id', 'image', 'name', 'channels', 'leads', 'detail', 'status', 'action' ];
    dataSource = new MatTableDataSource<ICampaign>();

    constructor(private dialog: MatDialog) {
    }

    editRow( dataFromElement: string ) {
        const dialogRef = this.dialog.open( ProjectDetailCampaignDialogComponent, {
            panelClass: 'project_campaign_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: ICampaign ) => {
            if ( result ) {
                this.dataSource.data.forEach( arr => {
                    if ( arr.id === result.id ) {
                        Object.assign( arr, result );
                    }
                } );
                this.table.renderRows();
            }
        } );
    }
    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }
    ngOnInit(): void {
        this.dataSource.data = dataDummyCampaign;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // Engkok nggawe iki harus'e
    /*ngOnChanges( data: SimpleChanges ) {
        if ( data[ 'dataFromParent' ] ) {
            this.dataSource.data = dataDummyCampaign;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }*/

}
