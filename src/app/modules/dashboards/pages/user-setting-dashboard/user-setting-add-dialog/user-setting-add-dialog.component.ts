import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { IUsers } from '../user-setting-dashboard.component';

@Component( {
    selector: 'app-user-setting-add-dialog',
    templateUrl: './user-setting-add-dialog.component.html',
    styleUrls: [ './user-setting-add-dialog.component.scss' ]
} )
export class UserSettingAddDialogComponent implements OnInit {
    private dataUser: IUsers;

    constructor(
        public dialogRef: MatDialogRef<UserSettingAddDialogComponent>,
        private fb: FormBuilder
    ) {
    }

    public formGroup = this.fb.group( {
        name: [ '', Validators.required ],
        email: [ '', [ Validators.required, Validators.email ] ],
        phone: [ '', [ Validators.required, Validators.pattern( '[0-9]+' ) ] ],
        address: [ '', Validators.required ],
        password: [ '', [ Validators.required, Validators.minLength( 8 ) ] ],
        role: [ '', Validators.required ],
    } );

    onSubmit() {
        if ( this.formGroup.valid ) {
            const dateNow = new Date().toISOString();
            this.dataUser = this.formGroup.value;
            this.dataUser.status = true;
            this.dataUser.create_at = dateNow;
            this.dataUser.update_at = dateNow;
            console.log( this.dataUser );
            this.dialogRef.close( this.dataUser );
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
    }

}
