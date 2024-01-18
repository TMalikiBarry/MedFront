import { ComponentFixture, TestBed } from '@angular/core/testing';
import {PrestationFormDialogComponent} from "./prestation-form-dialog.component";


describe('PrestationFormDialogComponent', () => {
  let component: PrestationFormDialogComponent;
  let fixture: ComponentFixture<PrestationFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestationFormDialogComponent]
    });
    fixture = TestBed.createComponent(PrestationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
