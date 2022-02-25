import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {UserTyping} from "../../../../../../../data/model/user-activity/user-typing.model";

@Component({
  selector: 'app-user-typing',
  templateUrl: './user-typing.component.html',
  styleUrls: ['./user-typing.component.css']
})
export class UserTypingComponent implements OnInit {

  static VISIBILITY_INTERVAL = 1000;

  _typing: UserTyping = null;

  isVisible: boolean = false;
  visibleInterval = null;

  @Output('onVisible') changeEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() set typing(value: UserTyping)
  {
    this._typing = value;
    this.showTyping();
  }

  constructor() { }

  ngOnInit(): void {

  }

  showTyping()
  {
    this.isVisible = true;
    this.changeEventEmitter.emit(true);

    this.clearVisibleInterval();
    this.visibleInterval = setTimeout(() => {

      this.hideTyping();

    }, UserTypingComponent.VISIBILITY_INTERVAL);
  }

  clearVisibleInterval()
  {
    if (this.visibleInterval !== null)
    {
      clearInterval(this.visibleInterval);
      this.visibleInterval = null;
    }
  }

  hideTyping()
  {
    this.isVisible = false;
    this.clearVisibleInterval();
    this.changeEventEmitter.emit(false);
  }

}
