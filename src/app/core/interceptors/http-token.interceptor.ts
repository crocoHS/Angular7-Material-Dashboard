import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpTokenInterceptor implements HttpInterceptor {
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem( 'token' );
        let headerModified;
        if ( !req.url.startsWith( 'https://api.dev.jala.ai/rest' ) ) {
            headerModified = req.clone( {
                setHeaders: { Authorization: `Bearer ${ token }` },
            } );
        } else {
            headerModified = req.clone();
        }
        return next.handle( headerModified );
    }
}
