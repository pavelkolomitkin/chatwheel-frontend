import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {UserActivitySocketService} from "../../../services/sockets/user-activity-socket.service";
import {Subscription} from "rxjs";
import {IBannedUser, IUnbannedUser, UserBannedMe, UserUnbannedMe} from "../../../data/actions";
import {User} from "../../../../security/data/models/user.model";

@Component({
  selector: 'app-user-activity-observer',
  templateUrl: './user-activity-observer.component.html',
  styleUrls: ['./user-activity-observer.component.css']
})
export class UserActivityObserverComponent implements OnInit, OnDestroy {

  userBannedMeSubscription: Subscription;
  userUnbannedMeSubscription: Subscription;
  iBannedUserSubscription: Subscription;
  iUnbannedUserSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private userActivitySocket: UserActivitySocketService
  ) { }

  ngOnInit(): void {

    this.userBannedMeSubscription = this.userActivitySocket.getUserBannedMe().subscribe(this.userBannedMeHandler);
    this.userUnbannedMeSubscription = this.userActivitySocket.getUserUnbannedMe().subscribe(this.userUnbannedMeHandler);

    this.iBannedUserSubscription = this.userActivitySocket.getIBannedUser().subscribe(this.iBannedUserHandler);
    this.iUnbannedUserSubscription = this.userActivitySocket.getIUnbannedUser().subscribe(this.iUnbannedUserHandler);
  }

  ngOnDestroy(): void {
    this.userBannedMeSubscription.unsubscribe();
    this.userUnbannedMeSubscription.unsubscribe();

    this.iBannedUserSubscription.unsubscribe();
    this.iUnbannedUserSubscription.unsubscribe();
  }

  userBannedMeHandler = (user: User) => {
    debugger
    this.store.dispatch(new UserBannedMe(user));
  }

  userUnbannedMeHandler = (user: User) => {
    debugger
    this.store.dispatch(new UserUnbannedMe(user));
  }

  iBannedUserHandler = (user: User) => {
    debugger
    this.store.dispatch(new IBannedUser(user));
  }

  iUnbannedUserHandler = (user: User) => {
    debugger
    this.store.dispatch(new IUnbannedUser(user));
  }
}
