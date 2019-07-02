import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    // For test only
    public url = 'http://localhost:6969/api/';
    // public url = 'https://mersacs.com/api/';

    constructor() {
    }

    getUrl() {
        return this.url;
    }
}
