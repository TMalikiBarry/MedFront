import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PoleComponent} from './pole.component';

describe('PoleComponent', () => {
  let component: PoleComponent;
  let fixture: ComponentFixture<PoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoleComponent]
    });
    fixture = TestBed.createComponent(PoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
