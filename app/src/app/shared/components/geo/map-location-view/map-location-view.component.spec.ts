import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLocationViewComponent } from './map-location-view.component';

describe('MapLocationViewComponent', () => {
  let component: MapLocationViewComponent;
  let fixture: ComponentFixture<MapLocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLocationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
