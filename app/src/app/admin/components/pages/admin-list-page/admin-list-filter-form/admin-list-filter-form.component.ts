import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminUserFormFilter} from "../../../../data/model/admin-user-form.filter";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admin-list-filter-form',
  templateUrl: './admin-list-filter-form.component.html',
  styleUrls: ['./admin-list-filter-form.component.css']
})
export class AdminListFilterFormComponent implements OnInit {

  @Output('onChange') changeEmitter: EventEmitter<AdminUserFormFilter> = new EventEmitter<AdminUserFormFilter>();

  @Input() email: string;
  @Input() isBlocked: boolean;
  @Input() isDeleted: boolean;

  constructor() { }

  ngOnInit(): void {

  }


  onFormChangeHandler(form: NgForm)
  {
    const filter: AdminUserFormFilter = form.value;

    this.changeEmitter.emit(filter);
  }

}
