import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowFocusStateWatcherComponent } from './window-focus-state-watcher.component';

describe('WindowFocusStateWatcherComponent', () => {
  let component: WindowFocusStateWatcherComponent;
  let fixture: ComponentFixture<WindowFocusStateWatcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowFocusStateWatcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowFocusStateWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
