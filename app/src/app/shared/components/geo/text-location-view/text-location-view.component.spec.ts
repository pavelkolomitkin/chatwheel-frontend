import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextLocationViewComponent } from './text-location-view.component';

describe('TextLocationViewComponent', () => {
  let component: TextLocationViewComponent;
  let fixture: ComponentFixture<TextLocationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextLocationViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextLocationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
