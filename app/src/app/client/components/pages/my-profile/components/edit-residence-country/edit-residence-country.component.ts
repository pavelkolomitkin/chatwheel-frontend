import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {User} from "../../../../../../security/data/models/user.model";
import {ProfileService} from "../../../../../services/profile.service";
import {Country} from "../../../../../../core/data/models/country.model";
import {UserUpdated} from "../../../../../../security/data/actions";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-residence-country',
  templateUrl: './edit-residence-country.component.html',
  styleUrls: ['./edit-residence-country.component.css']
})
export class EditResidenceCountryComponent implements OnInit {

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
    this.country = this.user.residenceCountry;
  }

  hasFieldChanged(): boolean
  {
    if ((!!this.country) && (!!this.user.residenceCountry))
    {
      return this.country.id !== this.user.residenceCountry.id;
    }

    return this.country !== this.user.residenceCountry;
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
      const updatedUser: User = await this.profileService.updateResidenceCountry(this.country).toPromise();
      this.store.dispatch(new UserUpdated(updatedUser));
    }
    catch (error)
    {
      this.initField();
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR,
        'Cannot change the residence country!', 'Error')));
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
