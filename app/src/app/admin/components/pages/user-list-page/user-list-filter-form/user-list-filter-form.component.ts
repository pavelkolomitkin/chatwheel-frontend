import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthUserTypes} from '../../../../data/model/auth-user-types.enum';
import {Country} from '../../../../../core/data/models/country.model';
import {ClientUserFormFilter} from "../../../../data/model/client-user-form.filter";

@Component({
  selector: 'app-user-list-filter-form',
  templateUrl: './user-list-filter-form.component.html',
  styleUrls: ['./user-list-filter-form.component.css']
})
export class UserListFilterFormComponent implements OnInit {

  @Output('onChange') changeEmitter: EventEmitter<ClientUserFormFilter> = new EventEmitter<ClientUserFormFilter>();

  @Input() countries: Country[];

  @Input() authType: AuthUserTypes;
  @Input() residenceCountry: Country;
  @Input() searchCountry: Country;

  @Input() isNotActivated: boolean;
  @Input() isBlocked: boolean;
  @Input() isDeleted: boolean;

  constructor(
  ) { }

  async ngOnInit() {

  }

  onFormChangeHandler(form: NgForm)
  {
    const data: ClientUserFormFilter = form.value;

    this.changeEmitter.emit(data);
  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

}
