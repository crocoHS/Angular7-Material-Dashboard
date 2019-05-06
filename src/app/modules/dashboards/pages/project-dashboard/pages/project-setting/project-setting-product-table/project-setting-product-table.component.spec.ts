import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingProductTableComponent } from './project-setting-product-table.component';

describe('ProjectSettingProductTableComponent', () => {
  let component: ProjectSettingProductTableComponent;
  let fixture: ComponentFixture<ProjectSettingProductTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingProductTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
