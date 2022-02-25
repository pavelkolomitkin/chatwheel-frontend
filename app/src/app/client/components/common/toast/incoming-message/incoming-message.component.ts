import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReceivedMessage} from "../../../../data/model/messages/received-message.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-incoming-message',
  templateUrl: './incoming-message.component.html',
  styleUrls: ['./incoming-message.component.css']
})
export class IncomingMessageComponent implements OnInit {

  @Output('onTap') tapEmitter: EventEmitter<number> = new EventEmitter<number>();

  @Input() message: ReceivedMessage;

  @Input() toastId: number;

  constructor(
    private router: Router,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {

  }

  onDismissClickHandler(event)
  {
    event.stopPropagation();

    this.toastService.remove(this.toastId);
  }

  async onClickHandler(event)
  {
    await this.router.navigateByUrl('/client/profile/me/messages/conversation/' + this.message.messageList.id);

    this.tapEmitter.emit(this.toastId);

    // const toasts = this.toastService.toasts;
    // toasts.forEach(toast => {
    //   this.toastService.remove(toast.toastId)
    // });
    //this.toastService.remove(this.toastId);
    //this.toastService.clear();
  }
}
