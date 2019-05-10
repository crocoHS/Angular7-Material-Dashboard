import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/store';
import { Login } from '../../../../core/store/auth/auth.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component( {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {
    constructor( private fb: FormBuilder,
                 private http: AuthenticationService,
                 private store: Store<AppState>,
                 private router: Router
    ) {
    }

    loginForm = this.fb.group( {
        email: [ 'pradhigda17@gmail.com', [ Validators.email, Validators.required ] ],
        password: [ '123', [ Validators.required ] ]
    } );

    onSubmit() {
        if ( this.loginForm.valid ) {
            this.http.login( this.loginForm.value )
                .pipe(
                    // TODO: UNTUK TEST SAJA, HARUS DIGANTI
                    // Gawe Demo nang Goyeng pake dibawah ini jika bukan demo
                    /*tap( (result: any) => {
                        const user = new JwtHelperService().decodeToken(result.token);
                        user.token = result.token;
                        this.store.dispatch( new Login( { user } ));
                        this.router.navigateByUrl('/dashboard');
                    } )*/
                    tap( (result: any) => {
                        const user = result;
                        this.store.dispatch( new Login( { user } ));
                        this.router.navigateByUrl('/dashboard');
                    } )
                )
                .subscribe(
                    () => {
                    },
                    ( err ) => alert( err )
                );
        }
    }

    ngOnInit() {
    }

}
