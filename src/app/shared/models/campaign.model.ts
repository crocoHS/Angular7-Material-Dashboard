export class Campaign {
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
    // project: Project;
}
