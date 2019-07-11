import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    // For test only
    private url = 'https://api.dev.jala.ai/rest/';
    private urlmersacs = 'https://mersacs.com/api/';
    private tenantId = 13;

    constructor() {
    }

    getUrl() {
        return this.url;
    }
    getUrlmersacs() {
        return this.urlmersacs;
    }

    getTenantId() {
        return this.tenantId;
    }
}
