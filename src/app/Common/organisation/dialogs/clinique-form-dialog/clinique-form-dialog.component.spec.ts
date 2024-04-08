import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CliniqueFormDialogComponent} from './clinique-form-dialog.component';

describe('CliniqueFormDialogComponent', () => {
  let component: CliniqueFormDialogComponent;
  let fixture: ComponentFixture<CliniqueFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliniqueFormDialogComponent]
    });
    fixture = TestBed.createComponent(CliniqueFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
