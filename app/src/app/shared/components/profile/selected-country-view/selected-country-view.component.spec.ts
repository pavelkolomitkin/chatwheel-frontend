import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCountryViewComponent } from './selected-country-view.component';

describe('SelectedCountryViewComponent', () => {
  let component: SelectedCountryViewComponent;
  let fixture: ComponentFixture<SelectedCountryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCountryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedCountryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
