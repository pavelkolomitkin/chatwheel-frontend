import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {UserActivitySocketService} from "../../../services/sockets/user-activity-socket.service";
import {Subscription} from "rxjs";
import {IBannedUser, IUnbannedUser, UserBannedMe, UserUnbannedMe} from "../../../data/actions";
import {User} from "../../../../security/data/models/user.model";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {TranslateService} from "@ngx-translate/core";
import {UserLogout} from "../../../../security/data/actions";

@Component({
  selector: 'app-user-activity-observer',
  templateUrl: './user-activity-observer.component.html',
  styleUrls: ['./user-activity-observer.component.css']
})
export class UserActivityObserverComponent implements OnInit, OnDestroy {

  iHasBeenDeletedSubscription: Subscription;
  iHasBeenBlockedSubscription: Subscription;
  userBannedMeSubscription: Subscription;
  userUnbannedMeSubscription: Subscription;
  iBannedUserSubscription: Subscription;
  iUnbannedUserSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private userActivitySocket: UserActivitySocketService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.iHasBeenDeletedSubscription = this.userActivitySocket.getIHasBeenDeleted().subscribe(this.iHasBeenDeletedHandler);
    this.iHasBeenBlockedSubscription = this.userActivitySocket.getIHasBeenBlocked().subscribe(this.iHasBeenBlockedHandler);
    this.userBannedMeSubscription = this.userActivitySocket.getUserBannedMe().subscribe(this.userBannedMeHandler);
    this.userUnbannedMeSubscription = this.userActivitySocket.getUserUnbannedMe().subscribe(this.userUnbannedMeHandler);

    this.iBannedUserSubscription = this.userActivitySocket.getIBannedUser().subscribe(this.iBannedUserHandler);
    this.iUnbannedUserSubscription = this.userActivitySocket.getIUnbannedUser().subscribe(this.iUnbannedUserHandler);
  }

  ngOnDestroy(): void {

    this.iHasBeenDeletedSubscription.unsubscribe();
    this.iHasBeenBlockedSubscription.unsubscribe();
    this.userBannedMeSubscription.unsubscribe();
    this.userUnbannedMeSubscription.unsubscribe();

    this.iBannedUserSubscription.unsubscribe();
    this.iUnbannedUserSubscription.unsubscribe();
  }

  iHasBeenDeletedHandler = () => {

    this.store.dispatch(new UserLogout());
  }

  iHasBeenBlockedHandler = async (reason: string) => {

    let message = await this.translate.get('YOUR_ACCOUNT_HAS_BEEN_BLOCKED').toPromise();
    if (!!reason)
    {
      message += ' ' + reason;
    }

    this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, message, 'ERROR')));
    this.store.dispatch(new UserLogout());
  }

  userBannedMeHandler = (user: User) => {
    this.store.dispatch(new UserBannedMe(user));
  }

  userUnbannedMeHandler = (user: User) => {
    this.store.dispatch(new UserUnbannedMe(user));
  }

  iBannedUserHandler = (user: User) => {
    this.store.dispatch(new IBannedUser(user));
  }

  iUnbannedUserHandler = (user: User) => {
    this.store.dispatch(new IUnbannedUser(user));
  }
}
