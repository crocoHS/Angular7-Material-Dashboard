import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailLeadComponent } from './project-detail-lead.component';

describe('ProjectDetailLeadComponent', () => {
  let component: ProjectDetailLeadComponent;
  let fixture: ComponentFixture<ProjectDetailLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
