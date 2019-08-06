export interface ICampaign {
    id: number;
    name: string;
    detail: string;
    picture: string;
    isActive: boolean;
    modifiedBy?: number;
    modifiedAt: any;
    createdBy: number;
    createdAt: Date;
    tenantId: number;
    project: {
        id: number
    }
}

export class Campaign {
    initialApi: ICampaign;
    id: number;
    picture: string;
    name: string;
    channels: number;
    leads: number;
    detail: string;
    status: boolean;
    projectId: number;
    isActive: boolean;

    // project: Project;
    constructor( payload: ICampaign | any ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.picture = payload.picture;
        this.name = payload.name;
        this.channels = 0;
        this.leads = 0;
        this.detail = payload.detail;
        this.status = payload.isActive;
        this.projectId = payload.project.id;
        this.isActive = payload.isActive;
    }

    getAllCampaign() {
        return {
            id: this.id,
            picture: this.picture,
            name: this.name,
            channels: this.channels,
            leads: this.leads,
            detail: this.detail,
            status: this.status,
        };
    }
}
