import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonnelFormDialogComponent} from './personnel-form-dialog.component';

describe('PersonnelFormDialogComponent', () => {
  let component: PersonnelFormDialogComponent;
  let fixture: ComponentFixture<PersonnelFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonnelFormDialogComponent]
    });
    fixture = TestBed.createComponent(PersonnelFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
