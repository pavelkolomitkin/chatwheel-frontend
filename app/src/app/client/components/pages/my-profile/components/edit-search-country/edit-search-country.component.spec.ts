import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSearchCountryComponent } from './edit-search-country.component';

describe('EditSearchCountryComponent', () => {
  let component: EditSearchCountryComponent;
  let fixture: ComponentFixture<EditSearchCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSearchCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSearchCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
