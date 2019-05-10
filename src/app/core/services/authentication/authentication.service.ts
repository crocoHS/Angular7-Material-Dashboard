import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthenticationService {
    private url = 'http://localhost:3000/api/auth';
    constructor( private http: HttpClient ) {
    }
    // Untuk demo saja
    public userPayload$ = new BehaviorSubject({
        token: 'blablablabla anjeng',
        id: 12312,
        role_id: 2,
        email: 'pradhigda17@gmail.com'
    });
    //////////////////////////////

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
        // UNTUK DEMO SAJA
        // return this.http.post(this.url, body.toString(), httpOptions);
        return this.userPayload$;
    }
}
