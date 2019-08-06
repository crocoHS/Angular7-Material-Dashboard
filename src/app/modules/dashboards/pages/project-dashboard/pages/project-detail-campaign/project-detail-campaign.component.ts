import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ProjectDetailCampaignDialogComponent } from './project-detail-campaign-dialog/project-detail-campaign-dialog.component';
import { Project } from '../../../../../../shared/models/project.model';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';
import { Campaign, ICampaign } from '../../../../../../shared/models/campaign.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
    selector: 'app-project-detail-campaign',
    templateUrl: './project-detail-campaign.component.html',
    styleUrls: [ './project-detail-campaign.component.scss' ]
} )
export class ProjectDetailCampaignComponent implements OnInit {
    // Data tentang project dari parent
    @Input() dataFromParent: Project;
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
        const body: Partial<ICampaign> = { isActive: !data.isActive };
        this.http.updateCampaign( data.projectId, data.id, body )
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
            data: this.dataFromParent
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

    ngOnInit(): void {
        this.http.getAllCampaigns( this.dataFromParent.id )
            .subscribe( val => {
                this.dataSource.data = val;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            } );
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
