import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component( {
    selector: 'app-user-setting-change-dialog',
    templateUrl: './user-setting-change-dialog.component.html',
    styleUrls: [ './user-setting-change-dialog.component.scss' ]
} )
export class UserSettingChangeDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<UserSettingChangeDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
    ) {
    }

    public password = new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] );

    onSubmit( data: FormControl ) {
        if ( data.valid ) {
            this.data.password = data.value;
            this.data.update_at = new Date().toISOString();
            this.dialogRef.close( this.data );
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }
}
