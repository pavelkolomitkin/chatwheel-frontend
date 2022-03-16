import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ClientUserService} from "../../../services/client-user.service";
import {User} from "../../../../security/data/models/user.model";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-client-user-profile-page',
  templateUrl: './client-user-profile-page.component.html',
  styleUrls: ['./client-user-profile-page.component.css']
})
export class ClientUserProfilePageComponent implements OnInit, OnDestroy {

  routeParamSubscription: Subscription;
  lastBlockedUserSubscription: Subscription;
  lastUnBlockedUserSubscription: Subscription;
  lastDeletedUserSubscription: Subscription;

  user: User = null;

  newReportNumber: number = 0;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientUserService
  ) { }

  ngOnInit(): void {

    this.lastBlockedUserSubscription = this.store.pipe(
      select(state => state.admin.lastBlockedUser),
      filter(user => !!user))
      .subscribe(this.modifiedUserHandler);

    this.lastUnBlockedUserSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockedUser),
      filter(user => !!user))
      .subscribe(this.modifiedUserHandler);

    this.lastDeletedUserSubscription = this.store.pipe(
      select(state => state.admin.lastDeletedUser),
      filter(user => !!user))
      .subscribe(this.modifiedUserHandler);

    this.routeParamSubscription = this.route.params.subscribe( async (params) => {

      this.user = null;

      const { id } = params;

      try {
        this.user = await this.service.getUser(id).toPromise();
      }
      catch (error)
      {
        await this.router.navigateByUrl('./404');
        return;
      }

    });

  }

  ngOnDestroy(): void {

    this.routeParamSubscription.unsubscribe();
    this.lastBlockedUserSubscription.unsubscribe();
    this.lastUnBlockedUserSubscription.unsubscribe();
    this.lastDeletedUserSubscription.unsubscribe();

  }

  modifiedUserHandler = (user: User) => {

    if (this.user.id != user.id)
    {
      return;
    }

    this.user = user;

  }

}
