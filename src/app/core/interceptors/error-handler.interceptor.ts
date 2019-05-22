import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Inject, Injector } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor( @Inject( Injector ) private injector: Injector, ) {
    }

    private get toastrService(): ToastrService {
        return this.injector.get( ToastrService );
    }

    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle( req ).pipe(
            retry( 1 ),
            catchError( ( err: HttpErrorResponse ) => {
                if ( err.status === 401 ) {
                    const service = this.injector.get( AuthenticationService );
                    this.toastrService.error( `${ err.status }`, 'Authorization Failed' );
                    service.logout();
                }
                return throwError( err );
            } )
        );
    }
}
