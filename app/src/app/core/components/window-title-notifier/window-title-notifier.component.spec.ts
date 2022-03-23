import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTitleNotifierComponent } from './window-title-notifier.component';

describe('WindowTitleNotifierComponent', () => {
  let component: WindowTitleNotifierComponent;
  let fixture: ComponentFixture<WindowTitleNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowTitleNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTitleNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
