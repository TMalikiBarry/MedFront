import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleFonctionnaliteComponent } from './nouvelle-fonctionnalite.component';

describe('NouvelleFonctionnaliteComponent', () => {
  let component: NouvelleFonctionnaliteComponent;
  let fixture: ComponentFixture<NouvelleFonctionnaliteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NouvelleFonctionnaliteComponent]
    });
    fixture = TestBed.createComponent(NouvelleFonctionnaliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
