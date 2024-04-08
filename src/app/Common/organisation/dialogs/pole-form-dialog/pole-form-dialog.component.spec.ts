import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PoleFormDialogComponent} from './pole-form-dialog.component';

describe('PoleFormDialogComponent', () => {
  let component: PoleFormDialogComponent;
  let fixture: ComponentFixture<PoleFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoleFormDialogComponent]
    });
    fixture = TestBed.createComponent(PoleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
