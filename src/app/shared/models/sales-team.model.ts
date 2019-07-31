import { CityCoverage } from './city-coverage.model';

export interface ISalesTeamMersaCS {
    id: string;
    name: string;
    coverage: [ {
        id: number;
        city: string;
    } ];
    pic: {
        id: string;
        name: string;
        phone: number;
        email: string;
        password: string;
        address: string;
    };
    salesOfficerCount: number;
    createAt: string;
    channel: string;
    status: boolean;
    performance: number;
}

export class SalesTeamMersaCS {
    id: string;
    name: string;
    coverage: string[];
    pic: {
        id: string;
        name: string;
        phone: number;
        email: string;
        password: string;
        address: string;
    };
    salesOfficerCount: number;
    leadsCount: number;
    channelsCount: number;
    createAt: string;
    channel: string;
    status: boolean;
    performance: number;

    constructor( payload: any ) {
        this.id = payload._id;
        this.name = payload.name;
        this.coverage = payload.coverage.map( val => new CityCoverage( val ) );
        this.pic = new Pic( payload.pic ).getPic();
        this.salesOfficerCount = payload.sales_officer_count;
        this.leadsCount = payload.leads_count;
        this.channelsCount = payload.channels_count;
        this.createAt = payload.create_at;
        this.channel = payload.channel;
        this.status = payload.status;
        this.performance = payload.performance;
    }

    getNameAndId() {
        return {
            _id: this.id,
            name: this.name
        };
    }

    updateThis( payload: Partial<SalesTeamMersaCS> ) {
        Object.assign( this, payload );
        return this;
    }
}

export class Pic {
    id: string;
    name: string;
    phone: number;
    email: string;
    password: string;
    address: string;

    constructor( payload ) {
        this.id = payload._id;
        this.name = payload.name;
        this.phone = payload.phone;
        this.email = payload.email;
        this.password = payload.password;
        this.address = payload.address;
    }

    getPic() {
        return {
            id: this.id,
            name: this.name,
            phone: this.phone,
            email: this.email,
            password: this.password,
            address: this.address
        };
    }

    updatePic( payload: Partial<Pic> ) {
        Object.assign( this, payload );
        return this;
    }
}

export interface ISalesTeam {
    id: number;
    name: string;
    description: string;
    address: string;
    email: string;
    phoneNumber: string;
    isActive: boolean;
    isGlobalCoverege: boolean;
    modifiedBy: number;
    modifiedAt: string;
    createdBy: number;
    createdAt: string;
    tenantId: number;
    members?: ( MembersEntity )[] | null;
}

export interface MembersEntity {
    id: number;
    role: string;
    isActive: boolean;
    modifiedBy: number;
    modifiedAt: string;
    createdBy: number;
    createdAt: string;
    tenantId: number;
    team: {
        id: number;
    };
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        status: string;
        address?: null;
        modifiedBy: number;
        modifiedAt: string;
        createdBy: number;
        createdAt: string;
        tenantId: number;
    };
}

export class SalesTeam {
    public initialApi: ISalesTeam;
    public id: number;
    public name: string;
    public description: string;
    public address: string;
    public email: string;
    public phoneNumber: string;
    public isActive: boolean;

    ////// Ketoke butuh member ambek user

    constructor( payload: ISalesTeam ) {
        this.initialApi = payload;
        this.id = payload.id;
        this.name = payload.name;
        this.description = payload.description;
        this.address = payload.address;
        this.email = payload.email;
        this.phoneNumber = payload.phoneNumber;
        this.isActive = payload.isActive;
    }
}
