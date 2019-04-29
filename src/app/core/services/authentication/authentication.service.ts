import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    private url = 'http://localhost:3000/api/auth';
    constructor( private http: HttpClient ) {
    }

    login(payload: any) {
        const httpOptions = {
            // Setting Option Header
            headers: new HttpHeaders({
                'Content-Type':  'application/x-www-form-urlencoded'
            })
        };
        const body = new HttpParams()
            .set('email', payload.email)
            // merubah ke md5
            .set('password', payload.password);

        return this.http.post(this.url, body.toString(), httpOptions);
    }
}
