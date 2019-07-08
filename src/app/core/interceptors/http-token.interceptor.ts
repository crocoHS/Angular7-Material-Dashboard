import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HttpTokenInterceptor implements HttpInterceptor {
    intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        const headerModified = req.clone( {
            // setHeaders: { Authorization: `Bearer ${token}` },
        } );
        return next.handle( headerModified );
    }
}
