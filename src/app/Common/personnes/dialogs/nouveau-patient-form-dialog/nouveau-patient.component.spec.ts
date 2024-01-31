import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NouveauPatientComponent} from './nouveau-patient.component';

describe('NouveauPatientComponent', () => {
  let component: NouveauPatientComponent;
  let fixture: ComponentFixture<NouveauPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauPatientComponent]
    });
    fixture = TestBed.createComponent(NouveauPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
