import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../../security/data/models/user.model";
import {filter, first, map, mergeMap} from "rxjs/operators";
import {Call} from "../../../../data/model/calls/call.model";
import {CallService} from "../../../../services/call.service";
import {Subscription} from "rxjs";
import {CallMember} from "../../../../data/model/calls/call-member.model";

@Component({
  selector: 'app-call-list-page',
  templateUrl: './call-list-page.component.html',
  styleUrls: ['./call-list-page.component.css'],
})
export class CallListPageComponent implements OnInit, OnDestroy {

  authorizedUser: User;

  isDirect: boolean = false;

  list: Call[] = null;

  lastCall: Call = null;
  lastDate: string = null;

  infiniteScrollDisabled: boolean = true;

  userBanStatusChangeSubscription: Subscription;

  constructor(
      private store: Store<State>,
      private router: Router,
      private route: ActivatedRoute,
      private service: CallService
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.isDirect = await this.route.data.pipe(
        map(data => data.isDirect),
        first()
    ).toPromise();

    await this.loadList();

    this.userBanStatusChangeSubscription = this.store.pipe(
      select(state => state.client.lastBanStatusChangedUser),
      filter(user => !!user)
    ).subscribe(this.onUserBanStatusChangeHandler);
  }

  async ngOnDestroy() {

    this.userBanStatusChangeSubscription.unsubscribe();

  }

  onUserBanStatusChangeHandler = (user: User) => {

    if (!this.list)
    {
      return;
    }

    this.list.forEach((call: Call, index: number) => {

      const memberIndex: number = call.members.findIndex(member => member.user.id === user.id);
      if (memberIndex !== -1)
      {
        const member: CallMember = call.members[memberIndex];
        member.user = user;

        this.list[index] = {...call};
      }

    });

  }

  async loadList()
  {
    this.infiniteScrollDisabled = true

    try {

      const list: Call[] = await this.service.getList(this.isDirect, this.lastCall, this.lastDate).toPromise();

      if (!this.list)
      {
        this.list = [];
      }

      if (list.length > 0)
      {

        this.lastCall = list[list.length - 1];
        this.lastDate = this.lastCall.updatedAt;

        this.list = this.list.concat(list);

        this.infiniteScrollDisabled = false;
      }

    }
    catch (error)
    {
      this.list = [];
    }
  }

  async onScroll()
  {
    await this.loadList();
  }

}
