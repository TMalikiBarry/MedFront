import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AccesFormDialogComponent} from './acces-form-dialog.component';

describe('AccesFormDialogComponent', () => {
  let component: AccesFormDialogComponent;
  let fixture: ComponentFixture<AccesFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccesFormDialogComponent]
    });
    fixture = TestBed.createComponent(AccesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
