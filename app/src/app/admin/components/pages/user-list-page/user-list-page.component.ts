import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ClientUserService} from "../../../services/client-user.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ClientUserListFilter} from "../../../data/model/client-user-list.filter";
import {User} from "../../../../security/data/models/user.model";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {BlockUserInit, DeleteUserInit, UnBlockUserInit} from "../../../data/actions";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListPageComponent implements OnInit, OnDestroy {

  paramSubscription: Subscription = null;

  userBlockedSubscription: Subscription = null;
  userUnBlockedSubscription: Subscription = null;
  userDeletedSubscription: Subscription = null;


  list: User[] = null;
  totalNumber: number = null;

  constructor(
    private store: Store<State>,
    private service: ClientUserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.paramSubscription = this.route.queryParams.subscribe(async (params) => {

      this.releaseUserManagementSubscriptions();


      this.initUserManagementSubscriptions();

      await this.loadUsers();

    });

  }

  ngOnDestroy(): void {

    this.paramSubscription.unsubscribe();

    this.releaseUserManagementSubscriptions();

  }

  initUserManagementSubscriptions()
  {
    this.userBlockedSubscription = this.store.pipe(
      select(state => state.admin.lastBlockedUser),
      filter(user => !!user)
    ).subscribe(this.userModifiedHandler);


    this.userUnBlockedSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockedUser),
      filter(user => !!user)
    ).subscribe(this.userModifiedHandler);

    this.userDeletedSubscription = this.store.pipe(
      select(state => state.admin.lastDeletedUser),
      filter(user => !!user)
    ).subscribe(this.userModifiedHandler);
  }

  releaseUserManagementSubscriptions()
  {
    if (this.userBlockedSubscription !== null)
    {
      this.userBlockedSubscription.unsubscribe();
      this.userBlockedSubscription = null;
    }

    if (this.userUnBlockedSubscription !== null)
    {
      this.userUnBlockedSubscription.unsubscribe();
      this.userUnBlockedSubscription = null;
    }

    if (this.userDeletedSubscription !== null)
    {
      this.userDeletedSubscription.unsubscribe();
      this.userDeletedSubscription = null;
    }
  }

  userModifiedHandler = (user: User) => {

    const index = this.list.findIndex(item => item.id === user.id);
    if (index !== -1)
    {
      this.list[index] = user;
    }

  }

  getCurrentFilter(): ClientUserListFilter
  {
    return {
      userType: null,
      isActivated: null,
      isBlocked: null,
      residenceCountry: null,
      sortType: null,
      sortField: null,
      deleted: null
    }
  }

  getCurrentListPage()
  {
    let param = this.route.snapshot.queryParams['page'];
    if (typeof param === 'undefined')
    {
      return 1;
    }

    const result = parseInt(param);
    return (result > 0) ? result : 1;
  }

  async loadUsers()
  {
    const filter: ClientUserListFilter = this.getCurrentFilter();
    const pageNumber: number = this.getCurrentListPage();

    try {
      const result = await this.service.getList(filter, pageNumber).toPromise();
      const { users, totalNumber } = result;

      this.list = users;
      this.totalNumber = totalNumber;
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, 'CANNOT_LOAD_USERS', 'ERROR')));
    }
  }

  onBlockUserHandler(user: User)
  {
    this.store.dispatch(new BlockUserInit(user));
  }

  onUnBlockUserHandler(user: User)
  {
    this.store.dispatch(new UnBlockUserInit(user));
  }

  onDeleteUserHandler(user: User)
  {
    this.store.dispatch(new DeleteUserInit(user));
  }
}
