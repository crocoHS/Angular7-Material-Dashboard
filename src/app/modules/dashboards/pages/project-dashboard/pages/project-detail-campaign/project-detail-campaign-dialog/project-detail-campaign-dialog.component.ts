import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardProjectService } from '../../../../../../../core/services/dashboard-project/dashboard-project.service';
import { Campaign, ICampaign } from '../../../../../../../shared/models/campaign.model';
import { Observable } from 'rxjs';
import { Project } from '../../../../../../../shared/models/project.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { ApiUploadService } from '../../../../../../../core/services/api-upload.service';

@Component( {
    selector: 'app-project-detail-campaign-dialog',
    templateUrl: './project-detail-campaign-dialog.component.html',
    styleUrls: [ './project-detail-campaign-dialog.component.scss' ]
} )
export class ProjectDetailCampaignDialogComponent implements OnInit {
    testGroup = new FormGroup( {
        name: new FormControl( '', [ Validators.required, Validators.min( 6 ) ] ),
        detail: new FormControl( '', Validators.required )
    } );
    imageUrl: string | ArrayBuffer;
    imageData: File;

    constructor(
        public dialogRef: MatDialogRef<ProjectDetailCampaignDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: Project | Campaign,
        private http: DashboardProjectService,
        private http2: ApiUploadService,
        private spinner: NgxSpinnerService
    ) {
    }

    imageUpload( value ) {
        /*const file: File = value.files[ 0 ];
        this.imageData = file;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev) => this.imageUrl = reader.result;*/
        this.imageData = value;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            this.spinner.show();
            let method: Observable<any>;
            // Jika ada data maka method PUT
            if ( this.data instanceof Campaign ) {
                const projectId = this.data.projectId;
                if ( this.imageData ) {
                    method = this.http2.uploadImage( this.imageData )
                        .pipe(
                            switchMap( ( value ) => {
                                const body = data.value;
                                Object.assign( body, { picture: value.fullPath } );
                                return this.http.updateCampaign( projectId, this.data.id, body );
                            } )
                        );
                } else {
                    method = this.http.updateCampaign( projectId, this.data.id, data.value );
                }
            } else { // Kudune Ditambahi ambek image upload engkok di merge. Dadi upload image disek terus baru sing iki
                method = this.http2.uploadImage( this.imageData )
                    .pipe(
                        switchMap( ( val ) => {
                            const body = data.value;
                            Object.assign( body, { picture: val.fullPath } );
                            return this.http.createCampaign( this.data.id, [ body ] );
                        } ),
                        map( ( value: ICampaign[] ) => new Campaign( value[ 0 ] ) )
                    );
            }
            method.subscribe(
                ( val ) => {
                    this.spinner.hide();
                    console.log( val );
                    this.dialogRef.close( val );
                }, err => {
                    console.log( err );
                    this.spinner.hide();
                }
            );
        }
    }

    setValue( value: Campaign ) {
        this.testGroup.setValue( {
            name: value.name,
            detail: value.detail
        } );
        this.imageUrl = value.picture;
    }

    ngOnInit() {
        if ( this.data instanceof Campaign ) {
            this.setValue( this.data );
        }
    }

}
