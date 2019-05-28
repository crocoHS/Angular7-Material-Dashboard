import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { coverage, Coverage, Dummy } from '../dataDummy';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component( {
    selector: 'app-sales-officer-dialog',
    templateUrl: './sales-officer-dialog.component.html',
    styleUrls: [ './sales-officer-dialog.component.scss' ],
    animations: [
        trigger( 'myInsertRemoveTrigger', [
            transition( ':enter', [
                style( { opacity: 0, transform: 'translateY(-100%)' } ),
                animate( '.2s', style( { opacity: 1, transform: 'translateY(0)' } ) ),
            ] ),
            transition( ':leave', [
                animate( '.2s', style( { opacity: 0, transform: 'translateY(-100%)' } ) )
            ] )
        ] )
    ]
} )
export class SalesOfficerDialogComponent implements OnInit, OnDestroy {
    //////////////////////////
    constructor(
        public dialogRef: MatDialogRef<SalesOfficerDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
        private spinner: NgxSpinnerService
    ) {
        this.testGroup.valueChanges.pipe( untilDestroyed( this ) )
            .subscribe( value => {
                this.isValid = this.testGroup.valid;
            } );
    }

    public isValid;

    public allCoverage: Coverage[];
    private curCoverage;
    private dummyData: Dummy;
    coverageChecked = new FormControl( '' );
    /////////////////////
    testGroup = new FormGroup( {
        name: new FormControl( '', Validators.required ),
        email: new FormControl( '', [ Validators.email, Validators.required ] ),
        phone: new FormControl( '', [
            Validators.required,
            Validators.pattern( /[0-9\+\-\ ]/ )
        ] ),
        address: new FormControl( '', Validators.required ),
        picName: new FormControl( '', Validators.required ),
        password: new FormControl( '', Validators.required ),
        coverage: new FormControl( '', Validators.required ),
    } );

    //////////////////////
    change( event, elRef ) {
        if ( event.checked ) {
            elRef.disable = true;
            elRef.placeholder = '';
            return this.testGroup.patchValue( { coverage: this.allCoverage } );
        }
        elRef.disable = false;
        elRef.placeholder = 'Add City';
        return this.testGroup.patchValue( { coverage: this.curCoverage } );
    }

    onKeyDown( e: KeyboardEvent ) {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter
            [ 46, 8, 9, 27, 13 ].indexOf( e.keyCode ) !== -1 ||
            ( e.keyCode === 65 && e.ctrlKey === true ) || // Allow: Ctrl+A
            ( e.keyCode === 67 && e.ctrlKey === true ) || // Allow: Ctrl+C
            ( e.keyCode === 86 && e.ctrlKey === true ) || // Allow: Ctrl+V
            ( e.keyCode === 88 && e.ctrlKey === true ) || // Allow: Ctrl+X
            ( e.keyCode === 65 && e.metaKey === true ) || // Cmd+A (Mac)
            ( e.keyCode === 67 && e.metaKey === true ) || // Cmd+C (Mac)
            ( e.keyCode === 86 && e.metaKey === true ) || // Cmd+V (Mac)
            ( e.keyCode === 88 && e.metaKey === true ) || // Cmd+X (Mac)
            ( e.keyCode >= 35 && e.keyCode <= 39 ) // Home, End, Left, Right
        ) {
            return;  // let it happen, don't do anything
        }
        // Ensure that it is a number and stop the keypress
        if (
            ( e.shiftKey || ( e.keyCode < 48 || e.keyCode > 57 ) ) &&
            ( e.keyCode < 96 || e.keyCode > 105 )
        ) {
            e.preventDefault();
        }
    }

    ///////////////////////

    setAllValue( value: Dummy ) {
        this.testGroup.setValue( {
            name: value.name,
            email: value.email,
            phone: value.phone,
            address: value.address,
            picName: value.picName,
            password: value.password,
            coverage: value.coverage
        } );
        this.coverageChecked.setValue( false );
    }

    ngOnInit() {
        if ( this.data ) {
            this.dummyData = this.data;
            this.curCoverage = this.dummyData.coverage;
            this.setAllValue( this.dummyData );
        }
        this.allCoverage = coverage;
    }

    ngOnDestroy(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    // TODO: SET TIMEOUT HARUS DIHILANGKAN KARENA SEMENTARA
    onSubmit( data: FormGroup ) {
        if ( data.valid ) {
            if ( this.dummyData ) {
                this.spinner.show();
                setTimeout( () => {
                    this.dialogRef.close( Object.assign( this.dummyData, data.value ) );
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
    }

}
