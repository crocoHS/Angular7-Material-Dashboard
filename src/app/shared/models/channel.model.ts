import { ISalesTeam } from './sales-team.model';

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
    public teams: ISalesTeam[];

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
    teams?: ( ISalesTeam )[] | null;
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

export interface IMedia {
    id: number;
    name: string;
    type: 'online' | 'other' | 'offline';
    options?: ( IOptionsEntity )[] | null;
}

export interface IOptionsEntity {
    id: number;
    name: string;
    value: string;
    detail: string;
    type: string;
    media: {
        id: number;
    };
}

export class Media {
    public initialApi: IMedia;
    public id: number;
    public name: string;
    public type: 'online' | 'other' | 'offline';
    public options?: ( IOptionsEntity )[] | null;

    constructor( payload: IMedia ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.name = payload.name;
        this.type = payload.type;
        this.options = payload.options;
    }
}

