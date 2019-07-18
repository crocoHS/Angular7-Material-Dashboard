export interface IStatus {
    id: number;
    point: number;
    shortDetail: string;
    detail?: any;
    isActive: boolean;
    modifiedBy?: any;
    modifiedAt?: any;
    createdBy: number;
    createdAt: Date;
    tenantId: number;
    project: {
        id: number;
    };
    status: {
        id: number
    };
}

export class Status {
    public initialApi: IStatus;
    public id: number;
    public name: string;
    public point: number;
    public status: boolean;

    constructor( payload: IStatus | any ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.name = payload.shortDetail;
        this.point = payload.point;
        this.status = payload.isActive;
    }
}
