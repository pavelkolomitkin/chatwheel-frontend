import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageObserverComponent } from './message-observer.component';

describe('MessageObserverComponent', () => {
  let component: MessageObserverComponent;
  let fixture: ComponentFixture<MessageObserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageObserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
