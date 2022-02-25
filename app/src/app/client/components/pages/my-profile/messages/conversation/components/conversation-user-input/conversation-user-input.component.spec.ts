import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationUserInputComponent } from './conversation-user-input.component';

describe('ConversationUserInputComponent', () => {
  let component: ConversationUserInputComponent;
  let fixture: ComponentFixture<ConversationUserInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationUserInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationUserInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
