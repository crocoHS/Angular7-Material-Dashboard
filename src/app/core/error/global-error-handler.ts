import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        @Inject( Injector ) private injector: Injector,
    ) {
    }

    private get toastrService(): ToastrService {
        return this.injector.get( ToastrService );
    }

    handleError( error: Error | HttpErrorResponse ): void {
        if ( error instanceof HttpErrorResponse ) {
            this.toastrService.error( `${ error.status }`, `${ error.message }` );
        } else {
            this.toastrService.error( 'FuckU', 'Error occurred' );
            console.log( error.stack );
            // this.notif.error( `${ err.status }`, err.error.message );
        }
    }
}
