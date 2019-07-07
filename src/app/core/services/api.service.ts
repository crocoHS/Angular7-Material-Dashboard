import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    // For test only
    private url = 'http://localhost:6969/api/';
    // private url = 'https://mersacs.com/api/';

    constructor() {
    }

    getUrl() {
        return this.url;
    }
}
