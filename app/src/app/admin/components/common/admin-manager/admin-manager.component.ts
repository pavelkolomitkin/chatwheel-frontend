import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {GetTotalNumberAdminUsers} from "../../../data/actions";
import {AdminUserStateSocketService} from "../../../services/sockets/admin-user-state-socket.service";
import {Subscription} from "rxjs";
import {UserLogout} from "../../../../security/data/actions";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit, OnDestroy {

  myAccountBlockedSubscription: Subscription;
  myAccountDeletedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private accountStateSocket: AdminUserStateSocketService
  ) { }

  ngOnInit(): void {

    this.store.dispatch(new GetTotalNumberAdminUsers());

    this.myAccountBlockedSubscription = this.accountStateSocket.getMyAccountBlocked().subscribe(this.myAccountBlockedHandler);
    this.myAccountDeletedSubscription = this.accountStateSocket.getMyAccountDeleted().subscribe(this.myAccountDeletedHandler);

  }

  ngOnDestroy(): void {

    this.myAccountBlockedSubscription.unsubscribe();
    this.myAccountDeletedSubscription.unsubscribe();
  }

  myAccountBlockedHandler = () => {

    this.store.dispatch(new GlobalNotification(
      new Notification(NotificationType.ERROR, 'YOUR_ACCOUNT_HAS_BEEN_BLOCKED', 'ERROR')
    ));

    this.store.dispatch(new UserLogout());
  }
  myAccountDeletedHandler = () => {

    this.store.dispatch(new GlobalNotification(
      new Notification(NotificationType.ERROR, 'YOUR_ACCOUNT_HAS_BEEN_DELETED', 'ERROR')
    ));

    this.store.dispatch(new UserLogout());
  }
}
