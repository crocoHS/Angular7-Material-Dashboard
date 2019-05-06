import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailCampaignComponent } from './project-detail-campaign.component';

describe('ProjectDetailCampaignComponent', () => {
  let component: ProjectDetailCampaignComponent;
  let fixture: ComponentFixture<ProjectDetailCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
