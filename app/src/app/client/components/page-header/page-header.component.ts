import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Observable, Subscription} from "rxjs";
import {User} from "../../../security/data/models/user.model";
import {UserLogout} from "../../../security/data/actions";

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css'],
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  user: Observable<User>;
  newMessageNumber: Number;

  newMessageNumberSubscription: Subscription = null;
  newMessageNumberTimeout: any = null;

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

  onLogoutClickHandler(event)
  {
    this.store.dispatch(new UserLogout());
  }
}
