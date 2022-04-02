import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../../security/data/models/user.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit, OnDestroy {


  user:Observable<User>
  newMessageNumber: Number;

  newMessageNumberSubscription: Subscription = null;
  newMessageNumberTimeout: any = null;

  isLocationShown: boolean

  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit(): void {
    this.user = this.store.pipe(select(state => state.security.user));

    this.newMessageNumberSubscription = this.store.pipe(select(state => state.client.newMessageNumber))
      .subscribe((newMessageNumber) => {

        this.updateMessageNumber(newMessageNumber);
      });
  }

  ngOnDestroy(): void {
    if (!!this.newMessageNumberSubscription)
    {
      this.newMessageNumberSubscription.unsubscribe();
      this.newMessageNumberSubscription = null;
    }

    if (!!this.newMessageNumberTimeout)
    {
      clearTimeout(this.newMessageNumberTimeout);
      this.newMessageNumberTimeout = null;
    }

  }

  onToggleDisplayLocationHandler(event)
  {
    this.isLocationShown = !this.isLocationShown;
  }

  updateMessageNumber(value: number)
  {
    if (!!this.newMessageNumberTimeout)
    {
      clearTimeout(this.newMessageNumberTimeout);
      this.newMessageNumberTimeout = null;
    }

    this.newMessageNumberTimeout = setTimeout(() => {
      this.newMessageNumber = value;
    }, 500);

  }

}
