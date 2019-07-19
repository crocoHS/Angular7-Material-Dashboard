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
    public minBookingPrice: number;
    public detail: string;
    public price: number;
    public status: boolean;

    constructor( payload: IProduct | any ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.name = payload.name;
        this.minBookingPrice = payload.minBookingPrice;
        this.detail = payload.detail;
        this.price = payload.price;
        this.status = payload.isActive;
    }
}

export interface IProductImage {
    id: number;
    title: string;
    path: string;
    sort: number;
    isActive: boolean;
    modifiedBy?: number;
    modifiedAt?: Date;
    createdBy: number;
    createdAt: Date;
    tenantId: number;
    product: {
        id: number;
    };
}

export class ProductImage {
    public initialApi: IProductImage;
    public id: number;
    public title: string;
    public path: string;
    public isActive: boolean;

    constructor( payload: IProductImage | any ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.title = payload.title;
        this.path = payload.path;
        this.isActive = payload.isActive;
    }
}

export interface IProductTag {
    id: number;
    tag: string;
    hidden: boolean;
    info?: any;
    createdBy: number;
    createdAt: Date;
    tenantId: number;
    product: {
        id: number;
    };
    tagGroup: {
        id: number;
    };
}

export interface IProductTagGroup {
    id: number;
    tenantCategory: string;
    type: string;
    allowHiddenTags: boolean;
    name: string;
    tags: IProductTag[];
}

export class ProductTag {
    public initialApi: IProductTag;
    public id: number;
    public tag: string;
    public hidden: boolean;
    public info: string;

    constructor( payload: IProductTag ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.tag = payload.tag;
        this.hidden = payload.hidden;
        this.info = payload.info;
    }
}

export class ProductTagGroup {
    public initialApi: IProductTagGroup;
    public id: number;
    public tenantCategory: string;
    public type: string;
    public allowHiddenTags: boolean;
    public name: string;
    public tag: ProductTag[];

    constructor( payload: IProductTagGroup ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.tenantCategory = payload.tenantCategory;
        this.type = payload.type;
        this.allowHiddenTags = payload.allowHiddenTags;
        this.name = payload.name;
        this.tag = payload.tags.map( val => new ProductTag( val ) );
    }
}
