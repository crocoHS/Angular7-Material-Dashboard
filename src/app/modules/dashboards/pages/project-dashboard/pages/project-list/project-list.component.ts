import { Component, OnInit } from '@angular/core';
import { DashboardProjectService } from '../../../../../../core/services/dashboard-project/dashboard-project.service';
import { Project } from '../../../../../../shared/models/project.model';
import { Observable } from 'rxjs';

@Component( {
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: [ './project-list.component.scss' ]
} )
export class ProjectListComponent implements OnInit {
    public listOfProject: Observable<Project[]>;

    constructor( private http: DashboardProjectService ) {
    }

    ngOnInit() {
        this.listOfProject = this.http.getProjectAll();
    }

}
