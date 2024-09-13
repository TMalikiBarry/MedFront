import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauModuleComponent } from './nouveau-module.component';

describe('NouveauModuleComponent', () => {
  let component: NouveauModuleComponent;
  let fixture: ComponentFixture<NouveauModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauModuleComponent]
    });
    fixture = TestBed.createComponent(NouveauModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
