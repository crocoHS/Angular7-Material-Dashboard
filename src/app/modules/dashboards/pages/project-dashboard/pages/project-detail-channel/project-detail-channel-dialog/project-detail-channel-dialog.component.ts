import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Channel, IChannel, Media } from '../../../../../../../shared/models/channel.model';
import { DashboardSalesTeamService } from '../../../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import { SalesTeam } from '../../../../../../../shared/models/sales-team.model';
import { map, tap } from 'rxjs/operators';
import { OptionDropdownV2Component } from '../../../../../../../shared/components/option-dropdown-v2/option-dropdown-v2.component';
import { ApiUploadService } from '../../../../../../../core/services/api-upload.service';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';

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
        detail: new FormControl( '', Validators.required ),
        salesTeam: new FormControl( '', Validators.required ),
    } );

    //////////////////////////
    constructor(
        public dialogRef: MatDialogRef<ProjectDetailChannelDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: Channel,
        private http: DashboardSalesTeamService,
        private http2: ApiUploadService,
        private http3: DashboardProjectService
    ) {
    }

    //////////////// MEDIA //////////////////////////
    public media: Media;
    public landingPageUrl = new FormControl( '', Validators.required );
    public redirectPageUrl = new FormControl( '', Validators.required );

    public imageUrl;
    // Jika imageFile null || undefined maka tidak upload
    public imageFile;

    setMediaValue( value: Media ) {
        this.landingPageUrl.setValue( value.options[ 0 ].value );
        this.redirectPageUrl.setValue( value.options[ 1 ].value );
    }


    changeImage( image: File ) {
        this.imageFile = image;
    }

    setAllValue( value: Channel ) {
        this.testGroup.setValue( {
            name: value.name,
            detail: value.detail,
            salesTeam: value.teams,
        } );
    }

    ngOnInit() {
        this.imageUrl = this.data.picture;
        this.http.getAllSalesTeam()
            .subscribe( value => {
                const allValue = value.map( val => {
                    return { id: val.id, value: false, name: val.name };
                } );
                console.log( allValue, 'false kudune' );
                this.teamsForCheckbox = allValue.map( val => {
                    const index = this.data.teams.findIndex( val2 => val2.id === val.id );
                    if ( index !== -1 ) {
                        val.value = true;
                    }
                    return val;
                } );
                console.log( this.teamsForCheckbox, 'from teamsCheckBox' );
            } );
        this.setAllValue( this.data );
        this.http3.getMediaById( this.data.mediaId )
            .subscribe( val => {
                this.media = val;
                this.setMediaValue( this.media );
                console.log( this.media );
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
            channelTeams: getTeam.map( val => {
                return { team: { id: val.id } };
            } )
        };
        if ( this.media.type === 'online' ) {
            const options = {
                channelOptions: [
                    { option: { id: this.media.options[ 0 ].id }, value: this.landingPageUrl.value },
                    { option: { id: this.media.options[ 1 ].id }, value: this.redirectPageUrl.value }
                ]
            };
            Object.assign( body, options );
        }
        return body;
    }

    /*
    TODO:   - Upload Image
            - Get Data ViewChild Dropdown
            - Put Method Channel
    */
    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            // this.dialogRef.close( Object.assign( this.dummyData, data.value ) );
            if ( this.imageFile ) {
                this.http2.uploadImage( this.imageFile );
            }
            console.log( data.value );
            console.log( this.getAllValue() );
        }
    }
}
