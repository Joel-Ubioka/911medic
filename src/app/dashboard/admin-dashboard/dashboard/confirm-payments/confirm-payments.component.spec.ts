import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPaymentsComponent } from './confirm-payments.component';

describe('ConfirmPaymentsComponent', () => {
  let component: ConfirmPaymentsComponent;
  let fixture: ComponentFixture<ConfirmPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmPaymentsComponent]
    });
    fixture = TestBed.createComponent(ConfirmPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
