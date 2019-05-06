import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component( {
    selector: 'app-project-new',
    templateUrl: './project-new.component.html',
    styleUrls: [ './project-new.component.scss' ]
} )
export class ProjectNewComponent implements OnInit {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    constructor( private fb: FormBuilder, private location: Location, private router: Router ) {
    }

    goBack() {
        this.location.back();
    }

    onChangeCheckbox( $event, nameTarget ) {
        const isChecked = this.thirdFormGroup.get( nameTarget );
        if ( !$event.checked ) {
            isChecked.disable();
            isChecked.patchValue( '0' );
        } else {
            isChecked.enable();
        }
    }

    // HARUSNYA INI NANTI AKAN SUBSCRIBE KE SERVICE POST
    // CEK VALIDATOR FORM
    // JIKA SUKSES REDIRECT KE ROUTE PROJECT LIST
    // OH IYA JANGAN LUPA FORM FALIDNYA
    onSubmit() {
        console.log( this.firstFormGroup.getRawValue() );
        console.log( this.secondFormGroup.getRawValue() );
        console.log( this.thirdFormGroup.getRawValue() );
        // Yang ditemplate TOLONG DIHAPUS
        this.location.back();
    }

    ngOnInit() {
        this.firstFormGroup = this.fb.group( {
            project_name: [ '', [ Validators.required, Validators.minLength( 5 ) ] ],
            detail: [ '', Validators.required ],
        } );
        this.secondFormGroup = this.fb.group( {
            product_name: [ '', Validators.required ],
            product_price: [ '', Validators.required ],
            product_detail: [ '', Validators.required ],
        } );
        this.thirdFormGroup = this.fb.group( {
            new_leads: [ { value: '0', disabled: true } ],
            interested: [ { value: '0', disabled: false }, [ Validators.required, Validators.min( 1 ) ] ],
            reservation: [ { value: '0', disabled: true } ],
            booking: [ { value: '0', disabled: true } ],
            kpr_process: [ { value: '0', disabled: true } ],
            closing: [ { value: '0', disabled: true } ],
            interested_not_now: [ { value: '0', disabled: false }, [ Validators.required, Validators.min( 1 ) ] ],
            no_response: [ { value: '0', disabled: true } ],
            not_interested: [ { value: '0', disabled: false }, [ Validators.required, Validators.min( 1 ) ] ],
            inactive: [ { value: '0', disabled: true } ],
            callback: [ { value: '0', disabled: true } ],
            invalid: [ { value: '0', disabled: true } ],
            visit: [ { value: '0', disabled: true } ],
            walk_in: [ { value: '0', disabled: true } ],
            very_interested: [ { value: '0', disabled: true } ],
        } );
    }

}
