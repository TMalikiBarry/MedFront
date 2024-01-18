import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogActionComponent} from './log-action.component';

describe('LogActionComponent', () => {
  let component: LogActionComponent;
  let fixture: ComponentFixture<LogActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogActionComponent]
    });
    fixture = TestBed.createComponent(LogActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
