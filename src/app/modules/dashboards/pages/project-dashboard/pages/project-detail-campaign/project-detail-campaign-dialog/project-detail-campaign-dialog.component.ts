import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICampaign } from '../project-detail-campaign.component';

@Component( {
    selector: 'app-project-detail-campaign-dialog',
    templateUrl: './project-detail-campaign-dialog.component.html',
    styleUrls: [ './project-detail-campaign-dialog.component.scss' ]
} )
export class ProjectDetailCampaignDialogComponent implements OnInit {
    testGroup = new FormGroup( {
        name: new FormControl( 'name', Validators.required ),
        detail: new FormControl( 'detail', Validators.required ),
    } );
    private dataTemporary: any;

    constructor(
        public dialogRef: MatDialogRef<ProjectDetailCampaignDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
    ) {
    }

    imageUpload( value ) {
        const file: File = value.files[ 0 ];
        const reader = new FileReader();
        reader.readAsDataURL( file );
        reader.onload = (ev) =>  val => console.log(val);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            // this.dialogRef.close( Object.assign( this.dataTemporary, data.value ) );
        }
    }

    setValue( value: ICampaign ) {
        this.testGroup.setValue( {
            name: value.name,
            detail: value.detail,
        } );
    }

    ngOnInit() {
        if ( this.data ) {
            this.dataTemporary = this.data;
            this.setValue( this.dataTemporary );
        }
    }

}
