import { Component, Input, OnInit } from '@angular/core';
import { ILead } from './project-detail-lead-table/project-detail-lead-table.component';

@Component( {
    selector: 'app-project-detail-lead',
    templateUrl: './project-detail-lead.component.html',
    styleUrls: [ './project-detail-lead.component.scss' ]
} )
export class ProjectDetailLeadComponent implements OnInit {
    @Input() dataFromParent: ILead[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
