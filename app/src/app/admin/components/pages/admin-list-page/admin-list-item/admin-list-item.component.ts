import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";

@Component({
  selector: '[app-admin-list-item]',
  templateUrl: './admin-list-item.component.html',
  styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {

  @Output('onChangePassword') changePasswordEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output('onEdit') editEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output('onBlock') blockEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output('onUnblock') unBlockEmitter: EventEmitter<User> = new EventEmitter<User>();
  @Output('onDelete') deleteEmitter: EventEmitter<User> = new EventEmitter<User>();

  @Input() authorizedUser: User;

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }


  onChangePasswordClickHandler(event)
  {
    this.changePasswordEmitter.emit(this.user);
  }

  onEditClickHandler(event)
  {
    this.editEmitter.emit(this.user);
  }

  onBlockClickHandler(event)
  {
    this.blockEmitter.emit(this.user);
  }

  onUnBlockClickHandler(event)
  {
    this.unBlockEmitter.emit(this.user);
  }

  onDeleteClickHandler(event)
  {
    this.deleteEmitter.emit(this.user);
  }

}
