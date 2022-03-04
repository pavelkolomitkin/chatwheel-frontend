import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationLastMessageComponent } from './conversation-last-message.component';

describe('ConversationLastMessageComponent', () => {
  let component: ConversationLastMessageComponent;
  let fixture: ComponentFixture<ConversationLastMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationLastMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationLastMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
