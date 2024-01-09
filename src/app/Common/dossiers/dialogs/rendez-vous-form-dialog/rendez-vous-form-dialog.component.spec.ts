import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousFormDialogComponent } from './rendez-vous-form-dialog.component';

describe('RendezVousFormDialogComponent', () => {
  let component: RendezVousFormDialogComponent;
  let fixture: ComponentFixture<RendezVousFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezVousFormDialogComponent]
    });
    fixture = TestBed.createComponent(RendezVousFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
