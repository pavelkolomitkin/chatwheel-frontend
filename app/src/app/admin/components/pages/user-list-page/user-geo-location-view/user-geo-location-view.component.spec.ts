import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGeoLocationViewComponent } from './user-geo-location-view.component';

describe('UserGeoLocationViewComponent', () => {
  let component: UserGeoLocationViewComponent;
  let fixture: ComponentFixture<UserGeoLocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGeoLocationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGeoLocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
