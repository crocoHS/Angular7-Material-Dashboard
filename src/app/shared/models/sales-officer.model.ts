
// IKI KUDUNE TEKAN API
export interface ISalesOfficer {
    _id: string;
    name: string;
    password: string;
    email: string;
    phone: number;
    gender: string;
    address: string;
    joined_at: string;
    sales_team: [ { _id: string, name: string } ];
    status: boolean;
    performance: number;
    leads: number;
}

export class SalesOfficer {
    id: string;
    name: string;
    password: string;
    email: string;
    phone: number;
    gender: string;
    address: string;
    joinedAt: string;
    salesTeam: [ { _id: string, name: string } ];
    status: boolean;
    performance: number;
    leads: number;

    constructor( payload ) {
        this.id = payload._id;
        this.name = payload.name;
        this.password = payload.password;
        this.email = payload.email;
        this.phone = payload.phone;
        this.gender = payload.gender;
        this.address = payload.address;
        this.joinedAt = payload.joined_at;
        this.salesTeam = payload.sales_team;
        this.status = payload.status;
        this.performance = payload.performance;
        this.leads = payload.leads;
    }

    /*getIdAndName() {
        return {
            id: this.id,
            salesTeam: this.salesTeam
        };
    }*/
    convertToApi(): ISalesOfficer {
        return {
            _id: this.id,
            name: this.name,
            password: this.password,
            email: this.email,
            phone: this.phone,
            gender: this.gender,
            address: this.address,
            joined_at: this.joinedAt,
            sales_team: this.salesTeam,
            status: this.status,
            performance: this.performance,
            leads: this.leads
        };
    }

    updateThis( payload: Partial<SalesOfficer> ) {
        Object.assign(this, payload);
        return this;
    }
}
