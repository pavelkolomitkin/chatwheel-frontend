import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatwheelComponent } from './chatwheel.component';

describe('ChatwheelComponent', () => {
  let component: ChatwheelComponent;
  let fixture: ComponentFixture<ChatwheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatwheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatwheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
