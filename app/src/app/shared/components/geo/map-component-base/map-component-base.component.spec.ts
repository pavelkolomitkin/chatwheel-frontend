import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponentBaseComponent } from './map-component-base.component';

describe('MapComponentBaseComponent', () => {
  let component: MapComponentBaseComponent;
  let fixture: ComponentFixture<MapComponentBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponentBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponentBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
