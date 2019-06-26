import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
    selector: 'app-project-detail-upload-dialog',
    templateUrl: './project-detail-upload-dialog.component.html',
    styleUrls: [ './project-detail-upload-dialog.component.scss' ]
} )
export class ProjectDetailUploadDialogComponent implements OnInit {
    public placeholderUploadButton = 'Upload file .xls or .xlsx';
    public isClearUploadShow = false;

    constructor(
        public dialogRef: MatDialogRef<ProjectDetailUploadDialogComponent>,
        private spinner: NgxSpinnerService
    ) {
    }

    uploadFiles( inputRef ) {
        const files: File = inputRef.files[ 0 ];
        console.log( 'cok', files );
        if ( inputRef.files && files ) {
            const filesName = files.name;
            const filesExt = filesName.substring( filesName.lastIndexOf( '.' ) + 1 ).toLowerCase();
            if ( filesExt === 'xlsx' || filesExt === 'xls' ) {
                if ( filesName.length > 30 ) {
                    const y = filesName.length;
                    this.placeholderUploadButton = filesName.slice( 0, 10 ) + '. . .' + filesName.slice( y - 10 );
                } else {
                    this.placeholderUploadButton = filesName;
                }
                this.isClearUploadShow = true;
            }
        }
    }

    clearUpload( inputRef ) {
        inputRef.value = '';
        this.placeholderUploadButton = 'Upload file .xls or .xlsx';
        this.isClearUploadShow = false;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    // TODO: SET TIMEOUT HARUS DIHILANGKAN KARENA SEMENTARA dan diganti dengan service
    onSubmit( inputRef ) {
        const files: File = inputRef.files[ 0 ];
        if ( files ) {
            this.spinner.show();
            setTimeout( () => {
                this.dialogRef.close();
                this.spinner.hide();
            }, 2000 );
        }
    }

    ngOnInit() {
    }

}
