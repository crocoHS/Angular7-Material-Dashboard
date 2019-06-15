import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOfficerMigrateDialogComponent } from './sales-officer-migrate-dialog.component';

describe('SalesOfficerMigrateDialogComponent', () => {
  let component: SalesOfficerMigrateDialogComponent;
  let fixture: ComponentFixture<SalesOfficerMigrateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOfficerMigrateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOfficerMigrateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
