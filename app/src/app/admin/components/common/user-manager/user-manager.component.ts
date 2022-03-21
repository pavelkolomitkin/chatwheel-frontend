import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {User} from "../../../../security/data/models/user.model";
import {Subscription} from "rxjs";
import {
  BlockUserInit,
  BlockUserStart,
  DeleteUserInit,
  DeleteUserStart,
  UnBlockUserInit,
  UnBlockUserStart
} from "../../../data/actions";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit, OnDestroy {

  isBlockUserWindowShown: boolean = false;
  blockingUser: User = null;
  blockingReason: string = '';


  isUnBlockUserWindowShown: boolean = false;
  unBlockingUser: User = null;

  isDeletingUserWindowShown: boolean = false;
  deletingUser: User = null;

  lastBlockingUserSubscription: Subscription;
  lastBlockedUserSubscription: Subscription;

  lastUnBlockingUserSubscription: Subscription;
  lastUnBlockedUserSubscription: Subscription;

  lastDeletingUserSubscription: Subscription;
  lastDeletedUserSubscription: Subscription;


  constructor(
    private store: Store<State>,
  ) { }

  ngOnInit(): void {

    this.lastBlockingUserSubscription = this.store.pipe(
      select(state => state.admin.lastBlockingUser)
    )
      .subscribe(this.lastBlockingUserHandler);

    this.lastBlockedUserSubscription = this.store.pipe(
      select(state => state.admin.lastBlockedUser),
      filter(user => !!user)
    ).subscribe(this.lastBlockedUserHandler);


    this.lastUnBlockingUserSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockingUser)
    )
      .subscribe(this.lastUnBlockingUserHandler);

    this.lastUnBlockedUserSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockedUser),
      filter(user => !!user)
    ).subscribe(this.lastUnblockedUserHandler);


    this.lastDeletingUserSubscription = this.store.pipe(
      select(state => state.admin.lastDeletingUser)
    ).subscribe(this.lastDeletingUserHandler);

    this.lastDeletedUserSubscription = this.store.pipe(
      select(state => state.admin.lastDeletedUser),
      filter(user => !!user)
    ).subscribe(this.lastDeletedUserHandler);

  }

  ngOnDestroy(): void {

    this.lastBlockingUserSubscription.unsubscribe();
    this.lastBlockedUserSubscription.unsubscribe();


    this.lastUnBlockingUserSubscription.unsubscribe();
    this.lastUnBlockedUserSubscription.unsubscribe();

    this.lastDeletingUserSubscription.unsubscribe();
    this.lastDeletedUserSubscription.unsubscribe();
  }

  lastBlockingUserHandler = (user: User) => {

    this.blockingUser = user;
    this.isBlockUserWindowShown = !!this.blockingUser;

    this.blockingReason = '';
  }

  lastBlockedUserHandler = (user: User) => {

    if (this.blockingUser.id !== user.id)
    {
      return;
    }

    this.store.dispatch(new BlockUserInit(null));
  }

  lastUnBlockingUserHandler = (user: User) => {


    this.unBlockingUser = user;
    this.isUnBlockUserWindowShown = !!this.unBlockingUser;
  }

  lastUnblockedUserHandler = (user: User) => {
    if (this.unBlockingUser.id !== user.id)
    {
      return;
    }

    this.store.dispatch(new UnBlockUserInit(null));
  }

  lastDeletingUserHandler = (user: User) => {
    this.deletingUser = user;
    this.isDeletingUserWindowShown = !!this.deletingUser;
  }

  lastDeletedUserHandler = (user: User) => {
    if (this.deletingUser.id !== user.id)
    {
      return;
    }

    this.store.dispatch(new DeleteUserInit(null));
  }

  onBlockUserWindowCloseHandler(event)
  {

    this.store.dispatch(new BlockUserInit(null));
  }

  onBlockButtonClickHandler(event)
  {
    this.store.dispatch(new BlockUserStart(this.blockingUser, this.blockingReason));
  }

  onUnBlockButtonClickHandler(event)
  {
    this.store.dispatch(new UnBlockUserStart(this.unBlockingUser));
  }

  onUnBlockUserWindowCloseHandler(event)
  {
    this.store.dispatch(new UnBlockUserInit(null));
  }

  onDeleteUserWindowCloseHandler(event)
  {
    this.store.dispatch(new DeleteUserInit(null))
  }

  onDeleteButtonClickHandler(event)
  {
    this.store.dispatch(new DeleteUserStart(this.deletingUser));
  }

}
