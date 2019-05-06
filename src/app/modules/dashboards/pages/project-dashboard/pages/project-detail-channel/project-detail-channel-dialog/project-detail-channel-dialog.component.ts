import { Component, Inject, OnInit } from '@angular/core';
import { IChannel } from '../dummyChannel';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component( {
    selector: 'app-project-detail-channel-dialog',
    templateUrl: './project-detail-channel-dialog.component.html',
    styleUrls: [ './project-detail-channel-dialog.component.scss' ]
} )
export class ProjectDetailChannelDialogComponent implements OnInit {
    public allTeams: any[] = [
        {
            id: 6,
            name: 'Team Jakarta Selatan'
        },
        {
            id: 7,
            name: 'Team Jakarta Barat'
        },
        {
            id: 5,
            name: 'Team Jakarta Utara'
        },
    ];
    private curTeams;
    private dummyData: IChannel;
    salesTeamChecked = new FormControl( 'salesTeamChecked' );
    /////////////////////
    testGroup = new FormGroup( {
        name: new FormControl( 'name', Validators.required ),
        trackingUrl: new FormControl( 'trackingUrl', Validators.required ),
        detail: new FormControl( 'detail', Validators.required ),
        salesTeam: new FormControl( 'salesTeam', Validators.required ),
    } );

    //////////////////////////
    constructor(
        public dialogRef: MatDialogRef<ProjectDetailChannelDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data
    ) {
    }

    change( event, elRef ) {
        if ( event.checked ) {
            elRef.disable = true;
            elRef.placeholder = '';
            return this.testGroup.patchValue( { coverage: this.curTeams } );
        }
        elRef.disable = false;
        elRef.placeholder = 'Add Teams';
        return this.testGroup.patchValue( { coverage: this.curTeams } );
    }

    ///////////////////////

    setAllValue( value: IChannel ) {
        this.testGroup.setValue( {
            name: value.name,
            trackingUrl: value.trackingUrl,
            detail: value.detail,
            salesTeam: value.teams,
        } );
        this.salesTeamChecked.setValue( false );
    }

    ngOnInit() {
        this.dummyData = this.data;
        this.curTeams = this.dummyData.teams;
        this.setAllValue(this.dummyData);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            this.dialogRef.close( Object.assign( this.dummyData, data.value ) );
        }
    }
}
