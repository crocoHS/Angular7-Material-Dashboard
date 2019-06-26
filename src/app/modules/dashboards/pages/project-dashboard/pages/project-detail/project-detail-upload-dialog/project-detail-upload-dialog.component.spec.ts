import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailUploadDialogComponent } from './project-detail-upload-dialog.component';

describe('ProjectDetailUploadDialogComponent', () => {
  let component: ProjectDetailUploadDialogComponent;
  let fixture: ComponentFixture<ProjectDetailUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailUploadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
