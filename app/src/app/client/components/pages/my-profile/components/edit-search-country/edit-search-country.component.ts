import {Component, Input, OnInit} from '@angular/core';
import {Country} from "../../../../../../core/data/models/country.model";
import {Observable} from "rxjs";
import {User} from "../../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {ProfileService} from "../../../../../services/profile.service";
import {UserUpdated} from "../../../../../../security/data/actions";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";

@Component({
  selector: 'app-edit-search-country',
  templateUrl: './edit-search-country.component.html',
  styleUrls: ['./edit-search-country.component.css']
})
export class EditSearchCountryComponent implements OnInit {

  country: Country;

  countries: Observable<Country[]>;

  isSaving: boolean = false;

  @Input() user: User;


  constructor(
    private store: Store<State>,
    private profileService: ProfileService
  ) { }

  initField()
  {
    this.country = this.user.searchCountry;
  }

  hasFieldChanged(): boolean
  {
    if ((!!this.country) && (!!this.user.searchCountry))
    {
      return this.country.id !== this.user.searchCountry.id;
    }

    return this.country !== this.user.searchCountry;
  }

  ngOnInit(): void {
    this.initField();

    this.countries = this.store.pipe(select(state => state.core.countries));
  }

  async onEditCommitHandler(event)
  {
    if (!this.hasFieldChanged())
    {
      return;
    }

    this.isSaving = true;

    try {
      const updatedUser: User = await this.profileService.updateSearchCountry(this.country).toPromise();
      this.store.dispatch(new UserUpdated(updatedUser));
    }
    catch (error)
    {
      this.initField();
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR,
        'Cannot change the search country!', 'Error')));
    }

    this.isSaving = false;
  }

  onCancelEditHandler(event)
  {
    this.initField();
  }

  onEditInitHandler(event)
  {
    this.initField();
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
