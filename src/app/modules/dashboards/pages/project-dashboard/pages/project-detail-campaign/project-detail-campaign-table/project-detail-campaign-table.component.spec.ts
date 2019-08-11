import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailCampaignTableComponent } from './project-detail-campaign-table.component';

describe('ProjectDetailCampaignTableComponent', () => {
  let component: ProjectDetailCampaignTableComponent;
  let fixture: ComponentFixture<ProjectDetailCampaignTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailCampaignTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailCampaignTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
