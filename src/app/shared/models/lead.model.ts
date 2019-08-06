export interface ILead {
    modifiedAt: string;
    location: ILeadLocation;
    migrationRefId: number;
    tenantId: number;
    status: ILeadStatus;
    createdAt: string;
    address: string;
    group: ILeadGroup;
    email: string;
    name: string;
    gender: string;
    interest: ILeadInterest;
    statistic: ILeadStatistic;
    uuid: string;
    owner: ILeadOwner;
    point?: null;
    phone: string;
    additionalInfo: ILeadAdditionalInfo;
}

export interface ILeadLocation {
    relatedLocation?: ( null )[] | null;
    location: string;
    locationId: number;
}

export interface ILeadStatus {
    statusId: number;
    statusSort: number;
    availability: string;
    categorySort: number;
    category: string;
    availabilitySort: number;
    categoryId: number;
    status: string;
}

export interface ILeadGroup {
    campaignId: number;
    channel: string;
    project: string;
    campaign: string;
    mediaType: string;
    media: string;
    projectId: number;
    channelId: number;
}

export interface ILeadInterest {
    productId: number;
    product?: null;
    productPrice?: null;
}

export interface ILeadStatistic {
    call: number;
    whatsappCall: number;
}

export interface ILeadOwner {
    userId: number;
    team?: null;
    user?: null;
    teamId?: null;
}

export interface ILeadAdditionalInfo {
    note: string;
    noKTP?: null;
}

export class Lead {
    public initialApi: ILead;
    public uuid: string;
    public address: string;
    public email: string;
    public name: string;
    public gender: string;
    public group: ILeadGroup;
    public status: ILeadStatus;

    constructor( payload: ILead ) {
        this.initialApi = payload;
        this.uuid = payload.uuid;
        this.address = payload.address;
        this.email = payload.email;
        this.name = payload.name;
        this.gender = payload.gender;
        this.group = payload.group;
        this.status = payload.status;
    }
}
