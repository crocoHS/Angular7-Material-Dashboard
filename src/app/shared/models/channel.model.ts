export class Channel {
    id: number;
    name: string;
    detail: string;
    picture: string;
    isActive: boolean;
    uniqueCode: string;
    tenantId: number;
    campaign: {
        id: number,
    };
    media: {
        id: number;
    };
}

