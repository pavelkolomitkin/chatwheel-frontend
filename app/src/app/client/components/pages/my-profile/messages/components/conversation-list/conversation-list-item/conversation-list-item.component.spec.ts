import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationListItemComponent } from './conversation-list-item.component';

describe('ConversationListItemComponent', () => {
  let component: ConversationListItemComponent;
  let fixture: ComponentFixture<ConversationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
