import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OnePatientPageComponent} from './one-patient-page.component';

describe('OnePatientPageComponent', () => {
  let component: OnePatientPageComponent;
  let fixture: ComponentFixture<OnePatientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnePatientPageComponent]
    });
    fixture = TestBed.createComponent(OnePatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
