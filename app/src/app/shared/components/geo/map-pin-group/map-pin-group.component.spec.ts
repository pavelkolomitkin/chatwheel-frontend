import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPinGroupComponent } from './map-pin-group.component';

describe('MapPinGroupComponent', () => {
  let component: MapPinGroupComponent;
  let fixture: ComponentFixture<MapPinGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapPinGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
