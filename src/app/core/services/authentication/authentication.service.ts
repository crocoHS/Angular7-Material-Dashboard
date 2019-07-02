import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Logout } from '../../store/auth/auth.actions';
import { ApiService } from '../api.service';

@Injectable()
export class AuthenticationService {
    private url = this.apiService.getUrl() + '/auth';

    constructor( private http: HttpClient,
                 private store: Store<AppState>,
                 private apiService: ApiService) {
    }

    // Untuk demo saja
    // public userPayload$ = new BehaviorSubject({
    //     token: 'blablablabla anjeng',
    //     id: 12312,
    //     role_id: 2,
    //     email: 'pradhigda17@gmail.com'
    // });
    //////////////////////////////

    login( payload: any ) {
        const body = {
            email: payload.email,
            password: payload.password
        };
        return this.http.post( this.url, body );
        // UNTUK DEMO SAJA
        // return this.userPayload$;
    }

    logout() {
        this.store.dispatch( new Logout() );
    }
}
