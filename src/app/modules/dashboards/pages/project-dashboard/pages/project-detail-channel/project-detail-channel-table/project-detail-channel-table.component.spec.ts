import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailChannelTableComponent } from './project-detail-channel-table.component';

describe('ProjectDetailChannelTableComponent', () => {
  let component: ProjectDetailChannelTableComponent;
  let fixture: ComponentFixture<ProjectDetailChannelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDetailChannelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailChannelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
