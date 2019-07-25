import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../../../../shared/models/project.model';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { map } from 'rxjs/operators';
import { DashboardSalesTeamService } from '../../../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';

/////// VALIDATOR HTTP ///////////
function containHttp( control: AbstractControl ): { [ key: string ]: boolean } | null {
    if ( control.value !== undefined && typeof control.value !== 'object' ) {
        if ( control.value.startsWith( 'https://' ) || control.value.startsWith( 'http://' ) ) {
            return null;
        }
    }
    return { 'containHttp': true };
}

@Component( {
    selector: 'app-project-detail-add-channel-dialog',
    templateUrl: './project-detail-add-channel-dialog.component.html',
    styleUrls: [ './project-detail-add-channel-dialog.component.scss' ]
} )
export class ProjectDetailAddChannelDialogComponent implements OnInit {
    public allCampaign$;
    public allSalesTeam$;
    public allMedia;
    public imageFile: File;

    constructor(
        public dialogRef: MatDialogRef<ProjectDetailAddChannelDialogComponent>,
        private fb: FormBuilder,
        @Inject( MAT_DIALOG_DATA ) public data: Project,
        private http: DashboardProjectService,
        private http2: DashboardSalesTeamService
    ) {
    }

    ///// FORM GROUP ////
    formChannel = this.fb.group( {
        name: [ [], Validators.required ],
        campaign: [ [], Validators.required ],
        media: [ [], Validators.required ],
        landPage: [ null, containHttp ],
        redirectPage: [ null, containHttp ],
        detail: [ [] ],
        salesTeam: [ [], Validators.required ],
        picture: []
    } );

    disableUrl( media ) {
        if ( media.type === 'online' ) {
            this.formChannel.get( 'landPage' ).enable();
            this.formChannel.get( 'redirectPage' ).enable();
        } else {
            this.formChannel.get( 'landPage' ).disable();
            this.formChannel.get( 'redirectPage' ).disable();
        }
    }

    // for Image Upload /////
    addImage( files ) {
        // const file: File = inputRef.files[0];
        /*const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (ev) => this.productImage.push(reader.result);*/
        this.imageFile = files;
        console.log( files );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            // this.dialogRef.close();
            console.log( this.imageFile, data.value );
        }
    }

    ngOnInit() {
        this.allCampaign$ = this.http.getAllCampaigns( this.data.id );
        this.allSalesTeam$ = this.http2.getAllSalesTeam()
            .pipe(
                map( value => value.map( val => val.getNameAndId() ) )
            );
        this.http.getAllMedias().subscribe( val => this.allMedia = val );
    }
}
