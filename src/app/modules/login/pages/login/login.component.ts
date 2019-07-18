import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';
import { Login } from '../../../../core/store/auth/auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit, OnDestroy {
    constructor( private fb: FormBuilder,
                 private http: AuthenticationService,
                 private store: Store<AppState>,
                 private router: Router,
                 private spinner: NgxSpinnerService,
    ) {
    }

    error: string;

    // [{"key":"email","value":"johncena@gmail.com","description":"","type":"text","enabled":true}]
    // [{"key":"password","value":"123","description":"","type":"text","enabled":true}]
    loginForm = this.fb.group( {
        ////////////////////////////////////
        email: [ 'johncena@gmail.com', [ Validators.email, Validators.required ] ],
        password: [ '123', [ Validators.required ] ]
        // email: [ 'brengsek@gmail.com', [ Validators.email, Validators.required ] ],
        // password: [ '123', [ Validators.required ] ]
    } );

    /*
        UNTUK TEST SAJA, HARUS DIGANTI
        TODO: - Form Control untuk login
              - Show Error Login ex: Wrong Password and Username
              - Disable Button menghindari multi click
              - Show Loading Spinner setelah success login dan navigate ke next URL
    */
    onSubmit() {
        if ( this.loginForm.valid ) {
            this.spinner.show();
            this.http.login( this.loginForm.value )
                .pipe(
                    tap( ( result: any ) => {
                        this.error = undefined;
                        const user = new JwtHelperService().decodeToken( result.token );
                        user.token = result.token;
                        this.store.dispatch( new Login( { user } ) );
                        this.router.navigateByUrl( '/dashboard' );
                    } )
                )
                .subscribe(
                    () => {
                    },
                    ( error: HttpErrorResponse ) => {
                        this.error = error.error.message;
                        this.spinner.hide();
                    }
                );
        }
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.spinner.hide();
    }

}
