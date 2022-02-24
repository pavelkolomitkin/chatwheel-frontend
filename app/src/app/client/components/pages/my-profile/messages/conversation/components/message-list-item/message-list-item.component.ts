import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../../../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../../../app.state";
import {first} from "rxjs/operators";
import {ConversationMessage} from "../../../../../../../../core/data/models/messages/conversation-message.model";
import {ConversationMessageService} from "../../../../../../../services/conversation-message.service";
import {NgForm} from "@angular/forms";
import {GlobalNotification} from "../../../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../../../core/data/models/notification.model";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css']
})
export class MessageListItemComponent implements OnInit, OnDestroy {

  @ViewChild('confirmationWindow') confirmationWindow: TemplateRef<any>;
  deleteConfirmationWindow: NgbModalRef;

  @Output('onRemoved') removedEmitter: EventEmitter<ConversationMessage> = new EventEmitter<ConversationMessage>();

  @Input() message: ConversationMessage;

  isEditing: boolean = false;
  isSaving: boolean = false;

  editingText: string = '';
  removeFromOthers: boolean = false;

  user: User;

  constructor(
    private store: Store<State>,
    private messageService: ConversationMessageService,
    private modal: NgbModal
  ) { }

  async ngOnInit() {
    this.user = await this.store.pipe(select(state => state.security.user), first()).toPromise();
  }

  ngOnDestroy(): void {
    if (!!this.deleteConfirmationWindow)
    {
      this.deleteConfirmationWindow.close();
      this.deleteConfirmationWindow = null;
    }
  }

  onEditClickHandler(event)
  {
    this.editingText = this.message.message.text;
    this.isEditing = true;
  }

  async onEditSubmitHandler(form: NgForm)
  {
     const text = this.editingText.trim();
     if (text === '')
     {
       return;
     }

     this.isSaving = true

     try {
       this.message = await this.messageService.edit(this.message, text).toPromise();
     }
     catch (error)
     {
       this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, 'Cannot edit this message!', 'Error')));
     }

    this.isEditing = false;
    this.isSaving = false;
  }

  onEditCancelHandler(event)
  {
    this.isEditing = false;
  }

  onRemoveClickHandler(event)
  {
    this.deleteConfirmationWindow = this.modal.open(this.confirmationWindow, { centered: true });

  }

  async onRemoveOtherMessageClickHandler(event)
  {
    await this.messageService.remove(this.message, false).toPromise();
    this.removedEmitter.emit(this.message);
  }

  async onDeleteConfirmClickHandler(event)
  {
    try {
      await this.messageService.remove(this.message, this.removeFromOthers).toPromise();
      if (!this.removeFromOthers)
      {
        this.removedEmitter.emit(this.message);
      }
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, 'Cannot delete this message!', 'Error')));
    }

  }
}
