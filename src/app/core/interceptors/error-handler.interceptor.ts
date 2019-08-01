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
            retry( 2 ),
            catchError( ( err: HttpErrorResponse ) => {
                /*if ( err.status === 401 ) {
                    const service = this.injector.get( AuthenticationService );
                    this.toastrService.error( `${ err.status }`, 'Authorization Failed' );
                    service.logout();
                } else if ( err.status === 404 ) {
                    this.toastrService.error( `${ err.status }`, 'ERROR BOSKUH' );
                }*/
                switch ( err.status ) {
                    case 0: {
                        this.toastrService.error( `CORS BOSS`, `Error Code ${ err.status }` );
                        break;
                    }
                    case 401: {
                        const service = this.injector.get( AuthenticationService );
                        this.toastrService.error( 'Authorization Failed', `Error Code ${ err.status }` );
                        service.logout();
                        break;
                    }
                    case 404: {
                        this.toastrService.error( `${ err.message } not found`, `Error Code ${ err.status }` );
                        break;
                    }
                    case 500: {
                        this.toastrService.error( `Internal Server Error`, `Error Code ${ err.status }` );
                        break;
                    }
                    default: {
                        this.toastrService.error( 'Something Gone Wrong', `Error Code ${ err.status }` );
                        break;
                    }
                }
                return throwError( err );
            } )
        );
    }
}
