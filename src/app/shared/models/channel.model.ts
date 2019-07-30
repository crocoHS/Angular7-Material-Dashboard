export class Channel {
    public initialApi: IChannel;
    public id: number;
    public name: string;
    public detail: string;
    public picture: string;
    public isActive: boolean;
    public uniqueCode: string;
    public tenantId: number;
    public campaignId: number;
    public mediaId: number;
    public channelOptions: IChannelOptionsEntity[];
    public teams: ITeamsEntity[];

    constructor( payload: IChannel ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.name = payload.name;
        this.detail = payload.detail;
        this.picture = payload.picture;
        this.isActive = payload.isActive;
        this.uniqueCode = payload.uniqueCode;
        this.tenantId = payload.tenantId;
        this.campaignId = payload.campaign.id;
        this.mediaId = payload.media.id;
        this.channelOptions = payload.channelOptions;
        this.teams = payload.teams;
    }
}


export interface IChannel {
    id: number;
    name: string;
    detail: string;
    picture: string;
    isActive: boolean;
    uniqueCode: string;
    modifiedBy: number;
    modifiedAt: string;
    createdBy: number;
    createdAt: string;
    tenantId: number;
    campaign: OptionOrChannelOrCampaignOrMedia;
    media: OptionOrChannelOrCampaignOrMedia;
    channelOptions?: ( IChannelOptionsEntity )[] | null;
    teams?: ( ITeamsEntity )[] | null;
}

export interface OptionOrChannelOrCampaignOrMedia {
    id: number;
}

export interface IChannelOptionsEntity {
    id: number;
    name: string;
    value: string;
    modifiedBy?: null;
    modifiedAt?: null;
    createdBy: number;
    createdAt: string;
    tenantId: number;
    option: OptionOrChannelOrCampaignOrMedia;
    channel: OptionOrChannelOrCampaignOrMedia;
}

export interface ITeamsEntity {
    id: number;
    name: string;
    description: string;
    address: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    isGlobalCoverege: boolean;
    modifiedBy?: number | null;
    modifiedAt?: string | null;
    createdBy: number;
    createdAt: string;
    tenantId: number;
}

