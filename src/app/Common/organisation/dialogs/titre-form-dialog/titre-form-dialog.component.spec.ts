import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TitreFormDialogComponent} from './titre-form-dialog.component';

describe('TitreFormDialogComponent', () => {
  let component: TitreFormDialogComponent;
  let fixture: ComponentFixture<TitreFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitreFormDialogComponent]
    });
    fixture = TestBed.createComponent(TitreFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
