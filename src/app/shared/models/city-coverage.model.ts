export class CityCoverage {
    public id: string;
    public city: string;

    constructor( payload ) {
        this.id = payload._id;
        this.city = payload.city;
    }
}
