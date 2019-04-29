import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store';
import { isLoggedIn } from '../store/auth/auth.selector';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor( private store: Store<AppState>, private router: Router ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        return this.store.pipe(
            select( isLoggedIn ),
            tap( loggedIn => {
                if ( !loggedIn ) {
                    this.router.navigateByUrl( '/login' );
                }
            } )
        );
    }
}
