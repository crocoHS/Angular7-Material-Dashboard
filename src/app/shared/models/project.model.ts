export interface IProject {
    id: number;
    name: string;
    detail: string;
    isActive: boolean;
    modifiedBy: number;
    modifiedAt: Date;
    createdBy: number;
    createdAt: Date;
    tenantId: number;
}

export class Project {
    public initialApi: IProject;
    public id: number;
    public name: string;
    public detail: string;
    public isActive: boolean;
    public tenantId: number;

    constructor( payload: IProject ) {
        this.initialApi = payload;
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
