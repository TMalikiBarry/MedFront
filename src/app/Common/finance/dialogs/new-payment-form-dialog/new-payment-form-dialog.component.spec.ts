import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaymentFormDialogComponent } from './new-payment-form-dialog.component';

describe('NewPaymentFormDialogComponent', () => {
  let component: NewPaymentFormDialogComponent;
  let fixture: ComponentFixture<NewPaymentFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPaymentFormDialogComponent]
    });
    fixture = TestBed.createComponent(NewPaymentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
