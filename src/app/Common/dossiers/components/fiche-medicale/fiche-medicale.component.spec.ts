import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FicheMedicaleComponent} from './fiche-medicale.component';

describe('FicheMedicaleComponent', () => {
  let component: FicheMedicaleComponent;
  let fixture: ComponentFixture<FicheMedicaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FicheMedicaleComponent]
    });
    fixture = TestBed.createComponent(FicheMedicaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
