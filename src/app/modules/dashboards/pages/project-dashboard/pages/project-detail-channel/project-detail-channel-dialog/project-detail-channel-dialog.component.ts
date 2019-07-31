import { Component, Inject, OnInit } from '@angular/core';
import { IChannel } from '../dummyChannel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Channel } from '../../../../../../../shared/models/channel.model';
import { DashboardSalesTeamService } from '../../../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import { SalesTeam } from '../../../../../../../shared/models/sales-team.model';
import { map, tap } from 'rxjs/operators';

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
    private dummyData: IChannel;

    /////////////////////
    testGroup = new FormGroup( {
        name: new FormControl( '', Validators.required ),
        landingPageUrl: new FormControl( '', Validators.required ),
        redirectPageUrl: new FormControl( '', Validators.required ),
        detail: new FormControl( '', Validators.required ),
        salesTeam: new FormControl( '', Validators.required ),
    } );

    //////////////////////////
    constructor(
        public dialogRef: MatDialogRef<ProjectDetailChannelDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: Channel,
        private http: DashboardSalesTeamService
    ) {
    }

    public imageUrl;
    // Jika imageFile null || undefined maka tidak upload
    public imageFile;

    changeImage( image: File ) {
        this.imageFile = image;
    }

    /*change( event, elRef ) {
        if ( event.checked ) {
            elRef.disable = true;
            elRef.placeholder = '';
            return this.testGroup.patchValue( { coverage: this.curTeams } );
        }
        elRef.disable = false;
        elRef.placeholder = 'Add Teams';
        return this.testGroup.patchValue( { coverage: this.curTeams } );
    }*/

    ///////////////////////

    setAllValue( value: Channel ) {
        this.testGroup.setValue( {
            name: value.name,
            landingPageUrl: value.channelOptions[ 0 ].value,
            redirectPageUrl: value.channelOptions[ 1 ].value,
            detail: value.detail,
            salesTeam: value.teams,
        } );
    }

    ngOnInit() {
        this.imageUrl = this.data.picture;
        // this.teamsForCheckbox = this.setTeams( this.data.teams, true );
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
        console.log( this.data.id );
        this.setAllValue( this.data );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /*
    TODO:   - Upload Image
            - Get Data ViewChild Dropdown
            - Put Method Channel
    */
    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            // this.dialogRef.close( Object.assign( this.dummyData, data.value ) );
            console.log( data.value );
        }
    }
}
