import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailCampaignDialogComponent } from './project-detail-campaign-dialog.component';

describe('ProjectDetailCampaignDialogComponent', () => {
  let component: ProjectDetailCampaignDialogComponent;
  let fixture: ComponentFixture<ProjectDetailCampaignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailCampaignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailCampaignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
