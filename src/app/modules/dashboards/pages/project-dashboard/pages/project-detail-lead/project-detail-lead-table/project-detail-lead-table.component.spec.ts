import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailLeadTableComponent } from './project-detail-lead-table.component';

describe('ProjectDetailLeadTableComponent', () => {
  let component: ProjectDetailLeadTableComponent;
  let fixture: ComponentFixture<ProjectDetailLeadTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailLeadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailLeadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
