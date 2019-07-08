
export class Project {

    constructor( public id: number,
                 public name: string,
                 public detail: string,
                 public isActive: string,
                 public tenantId: number
    ) {
    }

    getProject() {
        console.log( this );
        return this;
    }
}
