import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: '[app-user-list-item]',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Output() blockUserEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output() unBlockUserEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output() deleteUserEmitter: EventEmitter<User> = new EventEmitter<User>();


  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

  onBlockUserClickHandler(event)
  {
    this.blockUserEmitter.emit(this.user);
  }

  onUnBlockUserClickHandler(event)
  {
    this.unBlockUserEmitter.emit(this.user);
  }

  onDeleteUserClickHandler(event)
  {
    this.deleteUserEmitter.emit(this.user);
  }

}
