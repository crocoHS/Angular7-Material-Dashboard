export class Project {
    public id: number;
    public name: string;
    public detail: string;
    public isActive: string;
    public tenantId: number;

    constructor( payload ) {
        this.id = payload.id;
        this.name = payload.name;
        this.detail = payload.detail;
        this.isActive = payload.isActive;
        this.tenantId = payload.tenantId;
    }

    getProject() {
        console.log( this );
        return this;
    }
}
