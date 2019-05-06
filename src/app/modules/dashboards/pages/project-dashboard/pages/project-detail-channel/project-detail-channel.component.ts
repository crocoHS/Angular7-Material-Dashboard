import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { dataDummyChannel, IChannel } from './dummyChannel';
import { ProjectDetailChannelDialogComponent } from './project-detail-channel-dialog/project-detail-channel-dialog.component';

@Component( {
    selector: 'app-project-detail-channel',
    templateUrl: './project-detail-channel.component.html',
    styleUrls: [ './project-detail-channel.component.scss' ]
} )
export class ProjectDetailChannelComponent implements OnInit {
// Nanti ini dipakai bersama OnChanges
    // @Input() dataFromParent: ICampaign[];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<IChannel>;
    @ViewChild( MatSort ) sort: MatSort;
    data: IChannel[];
    displayedColumns: string[] = [ 'id', 'image', 'name', 'teams', 'leads', 'click', 'trackingUrl', 'status', 'action' ];
    dataSource = new MatTableDataSource<IChannel>();

    constructor(private dialog: MatDialog) {
    }
    editRow( dataFromElement: string ) {
        const dialogRef = this.dialog.open( ProjectDetailChannelDialogComponent, {
            panelClass: 'project_channel_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: IChannel ) => {
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

    ngOnInit() {
        this.data = dataDummyChannel;
        this.dataSource.data = this.data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // Engkok nggawe iki harus'e implements OnChanges
    /*ngOnChanges( data: SimpleChanges ) {
        if ( data[ 'dataFromParent' ] ) {
            this.dataSource.data = dataFromParent;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }*/
}
