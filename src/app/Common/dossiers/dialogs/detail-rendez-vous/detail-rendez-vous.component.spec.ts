import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRendezVousComponent } from './detail-rendez-vous.component';

describe('DetailRendezVousComponent', () => {
  let component: DetailRendezVousComponent;
  let fixture: ComponentFixture<DetailRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailRendezVousComponent]
    });
    fixture = TestBed.createComponent(DetailRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
