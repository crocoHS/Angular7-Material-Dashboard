export class Lead {
    public id: number;
    public name: string;
    public email: string;
    public telephone: string;
    public category: string;
    public status: string;
    public salesTeam: string;
    public salesOfficer: string;
    public campaign: string;
    public channel: string;

    constructor( payload ) {
        this.id = payload.uuid;
        this.name = payload.name;
        this.email = payload.email;
        this.telephone = payload.phone;
        this.category = payload.tags.category[0];
        this.status = payload.tags.status[0];
        // TODO: kudu ditakokno nabih ///
        this.salesTeam = null;
        this.salesOfficer = null;
        this.campaign = null;
        /////////////////////////////////
        this.channel = payload.tags.channel[0];
    }
}
