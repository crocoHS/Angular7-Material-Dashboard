import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingProductDialogComponent } from './project-setting-product-dialog.component';

describe('ProjectSettingProductDialogComponent', () => {
  let component: ProjectSettingProductDialogComponent;
  let fixture: ComponentFixture<ProjectSettingProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
