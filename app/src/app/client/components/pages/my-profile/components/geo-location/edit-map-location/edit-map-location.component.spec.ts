import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMapLocationComponent } from './edit-map-location.component';

describe('EditMapLocationComponent', () => {
  let component: EditMapLocationComponent;
  let fixture: ComponentFixture<EditMapLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMapLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMapLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
