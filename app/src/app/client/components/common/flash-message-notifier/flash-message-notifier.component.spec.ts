import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashMessageNotifierComponent } from './flash-message-notifier.component';

describe('FlashMessageNotifierComponent', () => {
  let component: FlashMessageNotifierComponent;
  let fixture: ComponentFixture<FlashMessageNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashMessageNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashMessageNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
