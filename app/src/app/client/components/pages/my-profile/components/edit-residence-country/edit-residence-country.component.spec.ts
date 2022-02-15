import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResidenceCountryComponent } from './edit-residence-country.component';

describe('EditResidenceCountryComponent', () => {
  let component: EditResidenceCountryComponent;
  let fixture: ComponentFixture<EditResidenceCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResidenceCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResidenceCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
