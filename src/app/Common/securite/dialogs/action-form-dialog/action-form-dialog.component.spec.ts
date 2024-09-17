import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionFormDialogComponent} from './action-form-dialog.component';

describe('ActionFormDialogComponent', () => {
  let component: ActionFormDialogComponent;
  let fixture: ComponentFixture<ActionFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionFormDialogComponent]
    });
    fixture = TestBed.createComponent(ActionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
