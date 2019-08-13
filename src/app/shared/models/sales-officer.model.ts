// IKI KUDUNE TEKAN API
export interface ISalesOfficerMersaCS {
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

export class SalesOfficerMersaCS {
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
    convertToApi(): ISalesOfficerMersaCS {
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

    updateThis( payload: Partial<SalesOfficerMersaCS> ) {
        Object.assign( this, payload );
        return this;
    }
}

export interface ISalesOfficer {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    address?: string;
    modifiedBy: number;
    modifiedAt: string;
    createdBy: number;
    createdAt: string;
    tenantId: number;
    teamMembers?: ( ITeamMembersEntity )[] | null;
    teams: ( ISalesOfficerTeam )[] | null;
}

export interface ITeamMembersEntity {
    id?: number;
    role?: string;
    isActive?: boolean;
    modifiedBy?: null;
    modifiedAt?: null;
    createdBy?: number;
    createdAt?: string;
    tenantId?: number;
    team: {
        id: number;
    };
    user?: {
        id: number;
    };
}

export interface ISalesOfficerTeam {
    id: number;
    role: string;
    isActive: boolean;
    modifiedBy?: null;
    modifiedAt?: null;
    createdBy: number;
    createdAt: string;
    tenantId: number;
    user: {
        id: number;
    };
    team: {
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
    };
}


export class SalesOfficer {
    public intialApi: ISalesOfficer;
    public id: number;
    public name: string;
    public email: string;
    public role: string;
    public status: string;
    public address: string;
    public createdAt: string;
    public teams: ( ISalesOfficerTeam )[] | null;

    constructor( payload: ISalesOfficer ) {
        this.intialApi = payload;
        this.id = payload.id;
        this.name = payload.name;
        this.email = payload.email;
        this.role = payload.role;
        this.status = payload.status;
        this.address = payload.address;
        this.createdAt = payload.createdAt;
    }

    get getAllTeamNameAndId() {
        return this.teams.map( value => {
            return {
                id: value.team.id,
                name: value.team.name
            };
        } );
    }
}
