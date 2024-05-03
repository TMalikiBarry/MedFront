import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailsPrestationComponent} from './details-prestation.component';

describe('DetailsPrestationComponent', () => {
  let component: DetailsPrestationComponent;
  let fixture: ComponentFixture<DetailsPrestationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPrestationComponent]
    });
    fixture = TestBed.createComponent(DetailsPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
