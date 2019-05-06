import { Component, OnInit } from '@angular/core';

@Component( {
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: [ './project-list.component.scss' ]
} )
export class ProjectListComponent implements OnInit {
    public listOfProject: any[] = [
        {
            id: 11,
            name: 'Project A',
            description: 'Project for Bombard the World'
        },
        {
            id: 12,
            name: 'Project B',
            description: 'Project for Destroy the World'
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
