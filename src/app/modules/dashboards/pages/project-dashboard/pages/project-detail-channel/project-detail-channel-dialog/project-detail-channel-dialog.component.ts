import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Channel } from '../../../../../../../shared/models/channel.model';
import { DashboardSalesTeamService } from '../../../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import { map, switchMap } from 'rxjs/operators';
import { OptionDropdownV2Component } from '../../../../../../../shared/components/option-dropdown-v2/option-dropdown-v2.component';
import { ApiUploadService } from '../../../../../../../core/services/api-upload.service';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { NgxSpinnerService } from 'ngx-spinner';

/////// VALIDATOR HTTP ///////////
function containHttp( control: AbstractControl ): { [ key: string ]: boolean } | null {
    if ( control.value !== undefined && typeof control.value !== 'object' ) {
        if ( control.value.startsWith( 'https://' ) || control.value.startsWith( 'http://' ) || control.value.includes(' ')) {
            return null;
        }
    }
    return { 'containHttp': true };
}

@Component( {
    selector: 'app-project-detail-channel-dialog',
    templateUrl: './project-detail-channel-dialog.component.html',
    styleUrls: [ './project-detail-channel-dialog.component.scss' ]
} )
export class ProjectDetailChannelDialogComponent implements OnInit {
    public teamsForCheckbox: {
        id: number,
        value: boolean,
        name: string
    }[];
    @ViewChild( OptionDropdownV2Component ) dropdown: OptionDropdownV2Component;

    /////////////////////
    public testGroup = new FormGroup( {
        name: new FormControl( '', Validators.required ),
        detail: new FormControl( '', Validators.required )
    } );

    //////////////////////////
    constructor(
        public dialogRef: MatDialogRef<ProjectDetailChannelDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: Channel,
        private http: DashboardSalesTeamService,
        private http2: ApiUploadService,
        private http3: DashboardProjectService,
        private spinner: NgxSpinnerService
    ) {
    }

    //////////////// MEDIA //////////////////////////
    public mediaType: 'online' | 'other' | 'offline';
    public landingPageUrl = new FormControl( '', [Validators.required, containHttp] );
    public redirectPageUrl = new FormControl( '', [Validators.required, containHttp] );

    public imageUrl;
    // Jika imageFile null || undefined maka tidak upload
    public imageFile;

    setMediaValue( value: Channel ) {
        this.landingPageUrl.setValue( value.channelOptions[ 0 ].value );
        this.redirectPageUrl.setValue( value.channelOptions[ 1 ].value );
        console.log( value );
    }


    changeImage( image: File ) {
        this.imageFile = image;
    }

    setAllValue( value: Channel ) {
        this.testGroup.setValue( {
            name: value.name,
            detail: value.detail
        } );
    }

    ngOnInit() {
        this.imageUrl = this.data.picture;
        this.http.getAllSalesTeam()
            .subscribe( value => {
                const allValue = value.map( val => {
                    return { id: val.id, value: false, name: val.name };
                } );
                this.teamsForCheckbox = allValue.map( val => {
                    const index = this.data.teams.findIndex( val2 => val2.id === val.id );
                    if ( index !== -1 ) {
                        val.value = true;
                    }
                    return val;
                } );
            } );
        this.setAllValue( this.data );
        this.http3.getMediaById( this.data.mediaId )
            .pipe(
                map( value => value.type )
            )
            .subscribe( val => {
                this.mediaType = val;
                /// gak ngerti opo'o API iki selalu value option e kosong
                /// maka dari itu setMediaValue dari this.data
                /// INTI DARI FETCH INI ADALAH MENENTUKAN INI ONLINE ATAU TIDAK
                if ( this.mediaType === 'online' ) {
                    this.setMediaValue( this.data );
                }
                console.log( this.data, this.mediaType );
            } );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getAllValue() {
        const getTeam = this.dropdown.getAllDataTrue;
        const body = {
            name: this.testGroup.get( 'name' ).value,
            detail: this.testGroup.get( 'detail' ).value,
            picture: this.imageUrl
        };
        if ( getTeam ) {
            const teams = {
                channelTeams: getTeam.map( val => {
                    return { team: { id: val.id } };
                } )
            };
            Object.assign( body, teams );
        }
        if ( this.mediaType === 'online' ) {
            const options = {
                channelOptions: [
                    { option: { id: this.data.channelOptions[ 0 ].option.id }, value: this.landingPageUrl.value },
                    { option: { id: this.data.channelOptions[ 1 ].option.id }, value: this.redirectPageUrl.value }
                ]
            };
            Object.assign( body, options );
        }
        console.log(body);
        return body;
    }

    /*
    TODO:   - Upload Image
            - Get Data ViewChild Dropdown
            - Put Method Channel
    */
    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            this.spinner.show();
            const body = this.getAllValue();
            let observable$;
            if ( this.imageFile ) {
                observable$ = this.http2.uploadImage( this.imageFile )
                    .pipe(
                        switchMap( value => {
                            body.picture = value.fullPath;
                            return this.http3.updateChannel( this.data.campaignId, this.data.id, body );
                        } )
                    );
            } else {
                observable$ = this.http3.updateChannel( this.data.campaignId, this.data.id, body );
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
            console.log('tesstt valid');
        }
        console.log('tesstt');
    }
}
