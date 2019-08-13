import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { salesTeams, ISalesTeam, Dummy } from '../dataDummy';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';
import { NgxSpinnerService } from 'ngx-spinner';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardSalesTeamService } from '../../../../../core/services/dashboard-sales-team/dashboard-sales-team.service';
import {
    ISalesOfficer,
    ISalesOfficerMersaCS,
    ITeamMembersEntity,
    SalesOfficer,
    SalesOfficerMersaCS
} from '../../../../../shared/models/sales-officer.model';
import { SalesTeam, SalesTeamMersaCS } from '../../../../../shared/models/sales-team.model';
import { map } from 'rxjs/operators';
import {
    IOptionDropdownV2,
    OptionDropdownV2Component
} from '../../../../../shared/components/option-dropdown-v2/option-dropdown-v2.component';
import { DashboardSalesOfficerService } from '../../../../../core/services/dashboard-sales-officer/dashboard-sales-officer.service';

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
    @ViewChild( OptionDropdownV2Component ) optionSales: OptionDropdownV2Component;

    constructor(
        public dialogRef: MatDialogRef<SalesOfficerDialogComponent>,
        @Inject( MAT_DIALOG_DATA ) public data,
        private spinner: NgxSpinnerService,
        private http: DashboardSalesTeamService,
        private http2: DashboardSalesOfficerService
    ) {
    }

    public teamsForCheckbox: IOptionDropdownV2[];
    private dummyData: SalesOfficer;
    /////////////////////
    testGroup = new FormGroup( {
        name: new FormControl( '', Validators.required ),
        email: new FormControl( '', [ Validators.email, Validators.required ] ),
        // phone: new FormControl( '', [
        //     Validators.required,
        //     Validators.pattern( /[0-9\+\-\ ]/ )
        // ] ),
        address: new FormControl( '', Validators.required ),
        // gender: new FormControl( 'Male', Validators.required ),
        // password: new FormControl( '', Validators.required ),
    } );

    //////////////////////
    /*change( event, elRef ) {
        if ( event.checked ) {
            elRef.disable = true;
            elRef.placeholder = '';
            return this.testGroup.patchValue( { salesTeam: this.salesTeams } );
        }
        elRef.disable = false;
        elRef.placeholder = 'Add Sales Team';
        return this.testGroup.patchValue( { salesTeam: this.curSalesTeam } );
    }*/

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
    setSalesTeam( salesTeam: SalesTeam[], salesOfficer?: SalesOfficer ) {
        const allTeams: IOptionDropdownV2[] = salesTeam.map( val => Object.assign( val.getIdAndName, { value: false } ) );
        if ( salesOfficer ) {
            salesOfficer.getAllTeamNameAndId.forEach( value => {
                const index = allTeams.findIndex( val => val.id === value.id );
                if ( index !== -1 ) {
                    allTeams[ index ].value = true;
                }
            } );
        }
        return allTeams;
    }

    setAllValue( value: SalesOfficer ) {
        this.testGroup.setValue( {
            name: value.name,
            email: value.email,
            // phone: value.phone,
            address: value.address,
            // gender: value.gender,
            // password: value.password,
            // salesTeam: value.teams
        } );
        // Email gak oleh diupdate ternyata
        this.testGroup.get( 'email' ).disable();
    }

    ngOnInit() {
        if ( this.data ) {
            this.dummyData = this.data;
            this.setAllValue( this.dummyData );
        }
        this.http.getAllSalesTeam()
            .subscribe( value => {
                this.teamsForCheckbox = this.data ? this.setSalesTeam( value, this.data ) : this.setSalesTeam( value );
            } );
        console.log( this.dummyData, this.teamsForCheckbox );
    }

    ngOnDestroy(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    /*
    TODO:   - SET TIMEOUT HARUS DIHILANGKAN KARENA SEMENTARA
            - SET TIMEOUT diganti Subscribe
    */
    onSubmit( data: FormGroup ) {
        if ( data.valid && this.optionSales.getAllDataTrue.length ) {
            this.spinner.show();
            const body: Partial<ISalesOfficer> = data.value;
            body.teamMembers = this.optionSales.getAllDataTrue.map( value => {
                return { team: { id: value.id } };
            } );
            if ( this.dummyData ) {
                this.http2.updateSalesOfficer( this.dummyData.id, body )
                    .subscribe( value => {
                        this.dialogRef.close( value );
                        this.spinner.hide();
                    } );
            } else {
                this.http2.createSalesOfficer( body )
                    .subscribe( value => {
                        this.dialogRef.close( value );
                        this.spinner.hide();
                    } );
            }
        }
    }

}
