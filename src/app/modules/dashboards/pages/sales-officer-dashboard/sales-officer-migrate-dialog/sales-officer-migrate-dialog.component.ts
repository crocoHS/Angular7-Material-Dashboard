import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';

@Component( {
    selector: 'app-sales-officer-migrate-dialog',
    templateUrl: './sales-officer-migrate-dialog.component.html',
    styleUrls: [ './sales-officer-migrate-dialog.component.scss' ]
} )
export class SalesOfficerMigrateDialogComponent implements OnInit, OnDestroy {

    constructor(
        public dialogRef: MatDialogRef<SalesOfficerMigrateDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
        private fb: FormBuilder,
        private spinner: NgxSpinnerService
    ) {
        this.formGroup.valueChanges
            .pipe(
                untilDestroyed( this )
            )
            .subscribe( () => this.isValid = this.formGroup.valid );
    }

    public isValid: boolean;

    public formGroup = this.fb.group( {
        salesOfficer: new FormControl( '', [ Validators.required ] ),
        category: new FormGroup( {
            new_leads: new FormControl( true ),
            hot: new FormControl( false ),
            cold: new FormControl( false ),
            unqualified: new FormControl( false ),
            closed: new FormControl( false ),
            warm: new FormControl( false ),
        } )
    } );

    get category() {
        return this.formGroup.get( 'category' );
    }

    checkAll() {
        const jembot = Object.keys( this.category.value ).reduce( ( acc, cur ) => {
            acc[ cur ] = true;
            return acc;
        }, {} );
        this.category.setValue( jembot );
    }

    // TODO: SET TIMEOUT HARUS DIHILANGKAN KARENA SEMENTARA
    onSubmit( data: FormGroup ) {
        if ( this.formGroup.valid ) {
            this.spinner.show();
            setTimeout( () => {
                this.dialogRef.close( this.formGroup.value );
                console.log( 'cok' );
                this.spinner.hide();
            }, 2000 );
        } else {
            this.spinner.show();
            setTimeout( () => {
                this.dialogRef.close( data.value );
                console.log( 'cok2' );
                this.spinner.hide();
            }, 2000 );
        }
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    ngOnInit() {
        console.log( this.data );
    }

    ngOnDestroy(): void {
    }
}
