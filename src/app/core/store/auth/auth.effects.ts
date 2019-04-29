import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActionTypes, Login, Logout } from './auth.actions';
import { tap } from 'rxjs/operators';
import { defer, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthEffects {

    @Effect( { dispatch: false } )
    login$ = this.actions$.pipe(
        ofType<Login>( AuthActionTypes.LoginAction ),
        tap( action => localStorage.setItem( 'token', action.payload.user.token ) )
    );

    @Effect( { dispatch: false } )
    logout$ = this.actions$.pipe(
        ofType<Logout>( AuthActionTypes.LogoutAction ),
        tap( () => {
            localStorage.removeItem( 'user' );
            this.router.navigateByUrl( '/login' );
        } )
    );


    @Effect()
    init$ = defer( () => {
        const userToken = localStorage.getItem( 'token' );

        if ( userToken ) {
            const expToken = new JwtHelperService().isTokenExpired( userToken );
            if ( !expToken ) {
                const userData = new JwtHelperService().decodeToken( userToken );
                userData.token = userToken;
                return of( new Login( { user: userData } ) );
            } else {
                return of( new Logout() ) as any;
            }
        } else {
            return of( new Logout() ) as any;
        }
    } );

    constructor( private actions$: Actions, private router: Router ) {
    }

}
