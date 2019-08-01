import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../../../../../shared/models/project.model';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { map, switchMap } from 'rxjs/operators';
import { DashboardSalesTeamService } from '../../../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import { ApiUploadService } from '../../../../../../../core/services/api-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OptionDropdownV2Component } from '../../../../../../../shared/components/option-dropdown-v2/option-dropdown-v2.component';
import { Media } from '../../../../../../../shared/models/channel.model';
import { Observable } from 'rxjs';
import { SalesTeam } from '../../../../../../../shared/models/sales-team.model';

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
    public allSalesTeam$: Observable<any[]>;
    public allMedia: Media[];
    public imageFile: File;

    constructor(
        public dialogRef: MatDialogRef<ProjectDetailAddChannelDialogComponent>,
        private fb: FormBuilder,
        @Inject( MAT_DIALOG_DATA ) public data: Project,
        private http: DashboardProjectService,
        private http2: DashboardSalesTeamService,
        private http3: ApiUploadService,
        private spinner: NgxSpinnerService
    ) {
    }

    ///// FORM SALES TEAM //////
    @ViewChild( OptionDropdownV2Component ) dropdown: OptionDropdownV2Component;
    ///// FORM GROUP ////
    formChannel = this.fb.group( {
        name: [ [], Validators.required ],
        campaign: [ [], Validators.required ],
        media: [ [], Validators.required ],
        landPage: [ null, containHttp ],
        redirectPage: [ null, containHttp ],
        detail: [ [] ],
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
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getAllValue( dataForm ) {
        const getTeam = this.dropdown.getAllDataTrue;
        const body = {
            name: dataForm.name,
            detail: dataForm.detail,
            picture: 'http://sdasdasds',
            isActive: true,
            media: { id: dataForm.media.id }
        };
        if ( dataForm.media.type === 'online' ) {
            console.log( dataForm.media );
            const options = {
                channelOptions: [
                    { option: { id: dataForm.media.options[ 0 ].id }, value: dataForm.landPage },
                    { option: { id: dataForm.media.options[ 1 ].id }, value: dataForm.redirectPage }
                ]
            };
            Object.assign( body, options );
        }
        if ( getTeam ) {
            const teams = {
                channelTeams: getTeam.map( val => {
                    return { team: { id: val.id } };
                } )
            };
            Object.assign( body, teams );
        }
        return body;
    }

    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            this.spinner.show();
            const body = this.getAllValue( data.value );
            let observable$;
            if ( this.imageFile ) {
                observable$ = this.http3.uploadImage( this.imageFile )
                    .pipe(
                        switchMap( value => {
                            body.picture = value.fullPath;
                            return this.http.createChannel( data.value.campaign, body );
                        } )
                    );
            } else {
                observable$ = this.http.createChannel( data.value.campaign, body );
            }
            observable$.subscribe(
                value => {
                    this.spinner.hide();
                    this.dialogRef.close( value );
                },
                ( err ) => {
                    this.spinner.hide();
                    console.log( err );
                } );
            console.log( body );
            // console.log( 'tesstt valid' );
            // console.log( this.imageFile, data.value );
            // console.log( this.getAllValue( data.value ) );
        }
    }

    ngOnInit() {
        this.allCampaign$ = this.http.getAllCampaigns( this.data.id );
        this.allSalesTeam$ = this.http2.getAllSalesTeam()
            .pipe(
                map( ( value: SalesTeam[] ) => {
                    return value.map( val => {
                        return { id: val.id, value: false, name: val.name };
                    } );
                } )
            );
        this.http.getAllMedias().subscribe( val => this.allMedia = val );
    }
}
