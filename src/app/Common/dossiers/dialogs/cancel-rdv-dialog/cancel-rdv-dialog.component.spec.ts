import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CancelRdvDialogComponent} from './cancel-rdv-dialog.component';

describe('CancelRdvDialogComponent', () => {
  let component: CancelRdvDialogComponent;
  let fixture: ComponentFixture<CancelRdvDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelRdvDialogComponent]
    });
    fixture = TestBed.createComponent(CancelRdvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
