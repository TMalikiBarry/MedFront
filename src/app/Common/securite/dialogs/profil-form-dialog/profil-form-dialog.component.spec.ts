import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProfilFormDialogComponent} from './profil-form-dialog.component';

describe('ProfilFormDialogComponent', () => {
  let component: ProfilFormDialogComponent;
  let fixture: ComponentFixture<ProfilFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilFormDialogComponent]
    });
    fixture = TestBed.createComponent(ProfilFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
