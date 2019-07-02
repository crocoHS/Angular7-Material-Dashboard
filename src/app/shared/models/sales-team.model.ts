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

    constructor( payload: any ) {
        this.id = payload._id;
        this.name = payload.name;
        this.coverage = payload.coverage;
        this.pic = new Pic( payload.pic ).getPic();
        this.salesOfficerCount = payload.sales_officer_count;
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
}
