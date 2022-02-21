import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeViewComponent } from './date-time-view.component';

describe('DateTimeViewComponent', () => {
  let component: DateTimeViewComponent;
  let fixture: ComponentFixture<DateTimeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
