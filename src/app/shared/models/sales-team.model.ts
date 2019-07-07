import { CityCoverage } from './city-coverage.model';

export interface ISalesTeam {
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

export class SalesTeam {
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

    updateThis( payload: Partial<SalesTeam> ) {
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
        Object.assign(this, payload);
        return this;
    }
}
