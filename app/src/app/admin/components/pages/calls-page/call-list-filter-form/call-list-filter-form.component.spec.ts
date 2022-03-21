import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallListFilterFormComponent } from './call-list-filter-form.component';

describe('CallListFilterFormComponent', () => {
  let component: CallListFilterFormComponent;
  let fixture: ComponentFixture<CallListFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallListFilterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallListFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
