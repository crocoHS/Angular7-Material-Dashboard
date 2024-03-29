import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { coverage, Coverage, Dummy } from '../dataDummy';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { animate, style, transition, trigger } from '@angular/animations';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardSalesTeamService } from '../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import { CityCoverage } from '../../../../../shared/models/city-coverage.model';
import { SalesTeamMersaCS } from '../../../../../shared/models/sales-team.model';

@Component( {
    selector: 'app-sales-team-dashboard-dialog',
    templateUrl: './sales-team-dashboard-dialog.component.html',
    styleUrls: [ './sales-team-dashboard-dialog.component.scss' ],
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
export class SalesTeamDashboardDialogComponent implements OnInit, OnDestroy {
    public allCoverage: CityCoverage[];
    private curCoverage;
    private dummyData: SalesTeamMersaCS;
    coverageChecked = new FormControl( false );
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

    //////////////////////////
    constructor(
        public dialogRef: MatDialogRef<SalesTeamDashboardDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data: SalesTeamMersaCS,
        private spinner: NgxSpinnerService,
        private http: DashboardSalesTeamService
    ) {
        this.testGroup.valueChanges.pipe( untilDestroyed( this ) )
            .subscribe( value => {
                this.isValid = this.testGroup.valid;
            } );
    }

    public isValid;

    //////////////////////////
    change( event, elRef ) {
        if ( event.checked ) {
            elRef.disable = true;
            elRef.placeholder = '';
            return this.testGroup.patchValue( { coverage: [ { id: 0, city: 'All City Added' } ] } );
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

    setAllValue( value: SalesTeamMersaCS ) {
        this.testGroup.setValue( {
            name: value.name,
            email: value.pic.email,
            phone: value.pic.phone,
            address: value.pic.address,
            picName: value.pic.name,
            password: value.pic.password,
            coverage: value.coverage
        } );
        this.coverageChecked.setValue( false );
    }

    ngOnInit() {
        if ( this.data ) {
            this.dummyData = this.data;
            this.curCoverage = this.dummyData.coverage;
            this.setAllValue( this.dummyData );
            console.log( 'initial value', this.dummyData );
        }
        // TODO: COVERAGE SUBSCRIBE KE API
        this.http.getAllCoveragesMersaCS().subscribe( value => {
            this.allCoverage = value;
        } );
    }

    ngOnDestroy(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /*
    TODO:   - SET TIMEOUT HARUS DIHILANGKAN KARENA SEMENTARA
            - Ada bug bila all city di centang
    */
    onSubmit( data: FormGroup ) {
        // check if form group valid
        if ( data.valid ) {
            // check if dummy data or initial data have value
            // distinguish add new dialog or edit dialog
            if ( this.dummyData ) {
                const adapterForm = {
                    name: data.value.name,
                    pic: {
                        id: this.dummyData.id,
                        email: data.value.email,
                        phone: data.value.phone,
                        address: data.value.address,
                        name: data.value.picName,
                        password: data.value.password,
                    }
                };
                // check if coverage city checked
                if ( this.coverageChecked.value ) {
                    Object.assign( adapterForm, { coverage: this.allCoverage } );
                }
                this.spinner.show();
                setTimeout( () => {
                    this.dialogRef.close( this.dummyData.updateThis( adapterForm ) );
                    this.spinner.hide();
                }, 2000 );
            } else {
                this.spinner.show();
                setTimeout( () => {
                    // this.dialogRef.close( data.value );
                    console.log( 'cok2' );
                    this.spinner.hide();
                }, 2000 );
            }
        }
    }

}
