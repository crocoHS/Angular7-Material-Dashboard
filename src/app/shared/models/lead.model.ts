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
    public phone: string;
    public group: ILeadGroup;
    public status: ILeadStatus;
    public owner: ILeadOwner;

    constructor( payload: ILead ) {
        this.initialApi = payload;
        this.uuid = payload.uuid;
        this.address = payload.address;
        this.email = payload.email;
        this.name = payload.name;
        this.gender = payload.gender;
        this.group = payload.group;
        this.phone = payload.phone;
        this.status = payload.status;
        this.owner = payload.owner;
    }

    get getChannel() {
        return {
            id: this.group.channelId,
            name: this.group.channel
        };
    }
    get getCampaign() {
        return {
            id: this.group.campaignId,
            name: this.group.campaign
        };
    }
    get getMedia() {
        return {
            id: this.group.mediaType,
            name: this.group.mediaType
        };
    }
    get getSalesTeam() {
        return {
            id: this.owner.teamId,
            name: this.owner.team
        };
    }
    get getSalesOfficer() {
        return {
            id: this.owner.userId,
            name: this.owner.user
        };
    }
    get getCategory() {
        return {
            id: this.status.categorySort,
            name: this.status.category
        };
    }
    get getStatus() {
        return {
            id: this.status.categoryId,
            name: this.status.status
        };
    }
}
