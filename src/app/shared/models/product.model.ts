export interface IProduct {
    id: number;
    name: string;
    sort: number;
    price: number;
    minBookingPrice: number;
    isActive: boolean;
    detail: string;
    modifiedBy?: any;
    modifiedAt?: any;
    createdBy: number;
    createdAt: Date;
    tenantId: number;
    project: {
        id: number;
    };
    pictures: any[];
}

export class Product {
    public initialApi: IProduct;
    public id: number;
    public name: string;
    public detail: string;
    public price: number;
    public status: boolean;

    constructor(payload: IProduct | any) {
        this.initialApi = payload;
        this.id = payload.id;
        this.name = payload.name;
        this.detail = payload.detail;
        this.price = payload.price;
        this.status = payload.isActive;
    }
}
