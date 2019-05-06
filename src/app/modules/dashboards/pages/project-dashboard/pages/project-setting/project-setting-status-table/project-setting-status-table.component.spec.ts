import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingStatusTableComponent } from './project-setting-status-table.component';

describe('ProjectSettingStatusTableComponent', () => {
  let component: ProjectSettingStatusTableComponent;
  let fixture: ComponentFixture<ProjectSettingStatusTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingStatusTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
