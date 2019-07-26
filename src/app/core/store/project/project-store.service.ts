import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ProjectStoreService {

    constructor() {
    }

    private readonly PROJECT = new BehaviorSubject<Project[]>( [] );

    get project(): Project[] {
        return this.PROJECT.getValue();
    }

    set project( val: Project[] ) {
        this.PROJECT.next( val );
    }

    readonly project$ = this.PROJECT.asObservable();

    getProjectById$( id ) {
        return this.project$.pipe(
            map( value => {
                return value.find( val => val.id === id );
            } )
        );
    }

    updateProjectById$( id, body: Project ) {
        return this.project$.pipe(
            map( value => {
                const arr = value;
                const index = value.findIndex( val => val.id === id );
                arr[index] = body;
                this.project = arr;
            } )
        );
    }
}
