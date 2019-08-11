import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component( {
    selector: 'app-dialog-delete',
    templateUrl: './dialog-delete.component.html',
    styleUrls: [ './dialog-delete.component.scss' ]
} )
export class DialogDeleteComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogDeleteComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
    ) {
    }

    onSubmit() {
        this.dialogRef.close( true );
    }

    onNoClick(): void {
        this.dialogRef.close( false );
    }

    ngOnInit() {
    }

}
