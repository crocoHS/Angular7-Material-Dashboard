import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProjectDetailUploadDialogComponent } from './project-detail-upload-dialog/project-detail-upload-dialog.component';
import { Project } from '../../../../../../shared/models/project.model';
import { tap } from 'rxjs/operators';
import { ProjectStoreService } from '../../../../../../core/store/project/project-store.service';
import { forkJoin, Observable } from 'rxjs';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Lead } from '../../../../../../shared/models/lead.model';
import { Channel } from '../../../../../../shared/models/channel.model';
import { Campaign } from '../../../../../../shared/models/campaign.model';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: [ './project-detail.component.scss' ],
    animations: [
        trigger( 'testAnimation', [
            transition( ':enter', [
                animate( '500ms ease', keyframes( [
                    style( {
                        display: 'block',
                        width: '100%',
                        height: '500px',
                        opacity: 0,
                        transform: 'translateX(100%)',
                        offset: 0
                    } ),
                    style( { height: 'auto', offset: .6, } ),
                    style( { display: 'block', width: '100%', opacity: 1, transform: 'translateX(0)', offset: 1, } ),
                ] ) ),
            ] ),
        ] )
    ]
} )
export class ProjectDetailComponent implements OnInit, OnDestroy {
    /*
    * TODO: - Untuk tambahan chart pada Channel dan Campaign
    *           bisa menggunakan data leads eksisting
    * */
    // Harusnya di throw di list
    public projectInUsedData$: Observable<Project>;
    public dataForOverview = {
        leads: null,
        campaign: null,
        channel: null
    };
    public dataLeads: Lead[];
    public dataChannel: Channel[];
    public dataCampaign: Campaign[];

    constructor(
        private router: ActivatedRoute,
        private route: Router,
        private dialog: MatDialog,
        private projectStore: ProjectStoreService,
        private http: DashboardProjectService
    ) {
        //////////////////////////
        const idProject: string = this.router.snapshot.params.id;
        this.projectInUsedData$ = this.projectStore.getProjectById$( Number( idProject ) )
            .pipe(
                untilDestroyed(this),
                tap( value => {
                    if ( !value ) {
                        this.route.navigateByUrl( '/dashboard/project/list' );
                    }
                } ) );
        forkJoin(
            this.http.getAllLeadsByProject( idProject ).pipe( tap( value => {
                this.dataLeads = value;
                this.dataForOverview.leads = value.length;
            } ) ),
            this.http.getAllChannel( idProject ).pipe( tap( value => {
                this.dataChannel = value;
                this.dataForOverview.channel = value.length;
            } ) ),
            this.http.getAllCampaigns( idProject ).pipe( tap( value => {
                this.dataCampaign = value;
                this.dataForOverview.campaign = value.length;
            } ) )
        ).subscribe();
    }

    isShow = 0;

    showTabs( val ) {
        this.isShow = val;
    }

    // Upload Dialog ////////////
    uploadDialog() {
        const dialogRef = this.dialog.open( ProjectDetailUploadDialogComponent, {
            panelClass: 'project_detail_upload_dialog',
        } );
        dialogRef.afterClosed().subscribe( ( result ) => {

        } );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
