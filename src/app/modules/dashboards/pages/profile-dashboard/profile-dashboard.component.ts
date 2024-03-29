import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component( {
    selector: 'app-profile-dashboard',
    templateUrl: './profile-dashboard.component.html',
    styleUrls: [ './profile-dashboard.component.scss' ]
} )
export class ProfileDashboardComponent {

    form = new FormGroup( {
        email: new FormControl( '', [
            Validators.required,
            Validators.email
        ] ),
        name: new FormControl( '', Validators.required ),
        address: new FormControl( '', Validators.required ),
        number: new FormControl( '', Validators.required ),
        pic: new FormControl( '', Validators.required ),
        password: new FormControl( '', [ Validators.required, Validators.min( 8 ) ] ),
    } );

    get name() {
        return this.form.get( 'name' );
    }

    get address() {
        return this.form.get( 'address' );
    }

    get number() {
        return this.form.get( 'number' );
    }

    get pic() {
        return this.form.get( 'pic' );
    }

    get email() {
        return this.form.get( 'email' );
    }

    get password() {
        return this.form.get( 'password' );
    }

    savechanges() {
        this.form.setErrors( {
            invalidSavechanges: true
        } );
    }
}
