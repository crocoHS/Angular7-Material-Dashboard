import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Project } from '../../../../../../../shared/models/project.model';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { Campaign, ICampaign } from '../../../../../../../shared/models/campaign.model';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectDetailCampaignDialogComponent } from '../project-detail-campaign-dialog/project-detail-campaign-dialog.component';

@Component( {
    selector: 'app-project-detail-campaign-table',
    templateUrl: './project-detail-campaign-table.component.html',
    styleUrls: [ './project-detail-campaign-table.component.scss' ]
} )
export class ProjectDetailCampaignTableComponent implements OnChanges {
// Data tentang project dari parent
    @Input() dataProject: Project;
    @Input() dataCampaign: Campaign[];
    @ViewChild( MatPaginator ) paginator: MatPaginator;
    @ViewChild( MatTable ) table: MatTable<Campaign>;
    @ViewChild( MatSort ) sort: MatSort;
    displayedColumns: string[] = [ 'id', 'picture', 'name', 'channels', 'leads', 'detail', 'status', 'action' ];
    dataSource = new MatTableDataSource<Campaign>();

    constructor(
        private dialog: MatDialog,
        private http: DashboardProjectService,
        private cd: ChangeDetectorRef,
        private spinner: NgxSpinnerService
    ) {
    }

    changeStatus( data: Campaign ) {
        this.spinner.show();
        const body: Partial<ICampaign> = { isActive: !data.isActive };
        this.http.updateCampaign( data.projectId, data.id, body )
            .subscribe(
                value => {
                    const index = this.dataSource.data.findIndex( val => val.id === value.id );
                    this.dataSource.data[ index ].isActive = value.isActive;
                    this.spinner.hide();
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

    editRow( dataFromElement: Campaign ) {
        const dialogRef = this.dialog.open( ProjectDetailCampaignDialogComponent, {
            panelClass: 'project_campaign_dialog',
            data: dataFromElement
        } );
        dialogRef.afterClosed().subscribe( ( result: Campaign ) => {
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

    addCampaign() {
        const dialogRef = this.dialog.open( ProjectDetailCampaignDialogComponent, {
            panelClass: 'project_campaign_dialog',
            data: this.dataProject
        } );
        dialogRef.afterClosed().subscribe( ( result: Campaign ) => {
            this.dataSource.data.push( result );
            this.table.renderRows();
        } );
    }

    applyFilter( filterValue: string ) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if ( this.dataSource.paginator ) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnChanges( data: SimpleChanges ): void {
        if ( data.dataCampaign.currentValue ) {
            this.dataSource.data = this.dataCampaign;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }
}
