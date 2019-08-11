import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Project } from '../../../../../../../shared/models/project.model';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Channel, IChannel } from '../../../../../../../shared/models/channel.model';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { ProjectDetailChannelDialogComponent } from '../project-detail-channel-dialog/project-detail-channel-dialog.component';
import { ProjectDetailAddChannelDialogComponent } from '../project-detail-add-channel-dialog/project-detail-add-channel-dialog.component';

@Component( {
    selector: 'app-project-detail-channel-table',
    templateUrl: './project-detail-channel-table.component.html',
    styleUrls: [ './project-detail-channel-table.component.scss' ]
} )
export class ProjectDetailChannelTableComponent implements OnChanges {
// Nanti ini dipakai bersama OnChanges
    // @Input() dataFromParent: ICampaign[];

    @Input() dataProject: Project;
    @Input() dataChannel: Channel[];

    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<Channel>;
    @ViewChild( MatSort ) sort: MatSort;
    displayedColumns: string[] = [ 'id', 'image', 'name', 'teams', 'leads', 'status', 'action' ];
    dataSource = new MatTableDataSource<Channel>();

    constructor(
        private dialog: MatDialog,
        private http: DashboardProjectService
    ) {
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    changeStatus( data: Channel ) {
        const body: Partial<IChannel> = { isActive: !data.isActive };
        this.http.updateChannel( data.campaignId, data.id, body )
            .subscribe(
                value => {
                    const index = this.dataSource.data.findIndex( val => val.id === value.id );
                    this.dataSource.data[ index ].isActive = value.isActive;
                    this.table.renderRows();
                    /*
                                        const newData = this.dataSource.data;
                                        this.dataSource = new MatTableDataSource<Campaign>( newData );
                                        this.dataSource.paginator = this.paginator;
                                        this.dataSource.sort = this.sort;
                    */
                }
            );
    }

    editRow( dataFromElement: Channel ) {
        const dialogRef = this.dialog.open( ProjectDetailChannelDialogComponent, {
            panelClass: 'project_channel_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: Channel ) => {
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

    addChannel() {
        const dialogRef = this.dialog.open( ProjectDetailAddChannelDialogComponent, {
            panelClass: 'project_channel_dialog',
            data: this.dataProject
        } );
        dialogRef.afterClosed()
            .subscribe( ( result: Channel ) => {
                this.dataSource.data.push( result );
                this.table.renderRows();
            } );
    }

    ngOnChanges( data: SimpleChanges ) {
        if ( data.dataChannel.currentValue ) {
            this.dataSource.data = this.dataChannel;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }
}
