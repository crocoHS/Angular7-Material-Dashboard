import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../../../../../shared/models/project.model';

@Component( {
    selector: 'app-project-detail-campaign',
    templateUrl: './project-detail-campaign.component.html',
    styleUrls: [ './project-detail-campaign.component.scss' ]
} )
export class ProjectDetailCampaignComponent implements OnInit {
    // Data tentang project dari parent
    @Input() dataFromParent: Project;

    constructor() {
    }

    ngOnInit(): void {
    }
}
