import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsObserverComponent } from './calls-observer.component';

describe('CallsObserverComponent', () => {
  let component: CallsObserverComponent;
  let fixture: ComponentFixture<CallsObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallsObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
