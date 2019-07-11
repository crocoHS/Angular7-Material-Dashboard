import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../../../shared/models/project.model';
import { defaultIfEmpty, map } from 'rxjs/operators';

@Injectable()
export class ProjectStoreService {

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
            map( value => value.filter( val => val.id === id ) )
        );
    }
}
