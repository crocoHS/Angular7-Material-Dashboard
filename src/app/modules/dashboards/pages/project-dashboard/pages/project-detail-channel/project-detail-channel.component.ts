import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../../../shared/models/project.model';

@Component( {
    selector: 'app-project-detail-channel',
    templateUrl: './project-detail-channel.component.html',
    styleUrls: [ './project-detail-channel.component.scss' ]
} )
export class ProjectDetailChannelComponent implements OnInit {

    @Input() dataProject: Project;

    ngOnInit() {
    }

}
