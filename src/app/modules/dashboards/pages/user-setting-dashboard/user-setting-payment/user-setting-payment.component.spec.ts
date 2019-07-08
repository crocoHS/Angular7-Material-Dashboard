import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingPaymentComponent } from './user-setting-payment.component';

describe('UserSettingPaymentComponent', () => {
  let component: UserSettingPaymentComponent;
  let fixture: ComponentFixture<UserSettingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
