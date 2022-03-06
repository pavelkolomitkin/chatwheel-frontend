import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../../app.state";
import {UserInitiateDirectCall} from "../../../../../../data/calls/actions";
import {Router} from "@angular/router";
import {UserReportAbuseInit} from "../../../../../../data/actions";
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search-list-item',
  templateUrl: './search-list-item.component.html',
  styleUrls: ['./search-list-item.component.css']
})
export class SearchListItemComponent implements OnInit, OnDestroy {

  @Input() user: User;

  userBanStatusChangeSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userBanStatusChangeSubscription = this.store.pipe(
      select(state => state.client.lastBanStatusChangedUser),
      filter(user => !!user)
    ).subscribe(user => {
      if (this.user.id === user.id)
      {
        this.user = user;
      }
    });
  }

  ngOnDestroy(): void {
    this.userBanStatusChangeSubscription.unsubscribe();
    this.userBanStatusChangeSubscription = null;
  }

  async onClickHandler(event)
  {
    await this.router.navigateByUrl('/client/profile/' + this.user.id);
  }

  onCallClickHandler(event)
  {
    event.stopPropagation();
    this.store.dispatch(new UserInitiateDirectCall(this.user));
  }

  async onMessageClickHandler(event)
  {
    event.stopPropagation();
    await this.router.navigateByUrl('/client/profile/me/messages/conversation/user/' + this.user.id);
  }

  async onReportAbuseClickHandler(event)
  {
    event.stopPropagation();
    this.store.dispatch(new UserReportAbuseInit(this.user));
  }
}
