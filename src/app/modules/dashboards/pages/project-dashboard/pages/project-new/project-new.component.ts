import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IStatus } from '../../../../../../shared/models/status.model';
import { IProduct } from '../../../../../../shared/models/product.model';
import { IProject } from '../../../../../../shared/models/project.model';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';
import { tap } from 'rxjs/operators';

@Component( {
    selector: 'app-project-new',
    templateUrl: './project-new.component.html',
    styleUrls: [ './project-new.component.scss' ]
} )
export class ProjectNewComponent implements OnInit {
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    constructor( private fb: FormBuilder,
                 private location: Location,
                 private router: Router,
                 private http: DashboardProjectService ) {
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
        // console.log( this.firstFormGroup.getRawValue() );
        // console.log( this.secondFormGroup.getRawValue() );
        // console.log( this.thirdFormGroup.getRawValue() );
        // console.log( this.setStatuses( this.thirdFormGroup.value ) );
        // Yang ditemplate TOLONG DIHAPUS
        // this.location.back();
        if ( this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid ) {
            const body = this.setProject( this.firstFormGroup.value, this.setStatuses(), this.setProduct( this.secondFormGroup.value ) );
            this.http.createProject( body )
                .pipe(
                    tap( () => this.location.back() )
                )
                .subscribe( val => console.log( val ) );
        }
    }

    statusesToArray( formValue, bol ) {
        const arrKey = Object.keys( formValue );
        return arrKey.reduce( ( acc, cur ) => {
            const body: Partial<IStatus> = {
                shortDetail: null,
                point: 0,
                isActive: bol
            };
            body.shortDetail = cur.replace( /_/g, ' ' );
            body.point = Number( formValue[ cur ] );
            acc.push( body );
            return acc;
        }, [] );
    }

    setStatuses() {
        const initial = this.statusesToArray( this.thirdFormGroup.getRawValue(), false );
        const update = this.statusesToArray( this.thirdFormGroup.value, true );
        update.forEach( val => {
            const index = initial.findIndex( res => val.shortDetail === res.shortDetail );
            initial[ index ] = val;
        } );
        return initial;
    }

    setProduct( formValue ) {
        const body: Partial<IProduct> = {
            name: formValue.product_name,
            detail: formValue.product_detail,
            price: formValue.product_price
        };
        return [ body ];
    }

    setProject( formValue, statusValue, productsValue ) {
        const body = {
            name: formValue.project_name,
            detail: formValue.detail,
            leadStatuses: statusValue,
            products: productsValue
        };
        return body;
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
