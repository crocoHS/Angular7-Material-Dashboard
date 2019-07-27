import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component( {
    selector: 'app-user-setting-payment-dialog',
    templateUrl: './user-setting-payment-dialog.component.html',
    styleUrls: [ './user-setting-payment-dialog.component.scss' ]
} )
export class UserSettingPaymentDialogComponent implements OnInit {
    qrImage: File;

    constructor(
        public dialogRef: MatDialogRef<UserSettingPaymentDialogComponent>
    ) {
    }

    getQrImage( file: File ) {
        this.qrImage = file;
    }

    onNoClick() {
        this.dialogRef.close();
    }

    onSubmit( data ) {
        if ( this.qrImage ) {
            const body = {
                option: data,
                qrImage: this.qrImage
            };
            console.log( body );
            this.dialogRef.close(body);
        }
    }

    ngOnInit() {
    }

}
