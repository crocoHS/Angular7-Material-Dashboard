import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOfficerDialogComponent } from './sales-officer-dialog.component';

describe('SalesOfficerDialogComponent', () => {
  let component: SalesOfficerDialogComponent;
  let fixture: ComponentFixture<SalesOfficerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOfficerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOfficerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
