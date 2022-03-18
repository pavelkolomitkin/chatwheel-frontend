import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {AdminUserService} from "../../../services/admin-user.service";
import {Observable, Subscription} from "rxjs";
import {
  AdminUserBlocked,
  AdminUserCreated, AdminUserDeleted, AdminUserEdited, AdminUserPasswordReset, AdminUserUnBlocked, BlockAdminUserInit,
  CreateAdminUserInit, DeleteAdminUserInit, EditAdminUserInit,
  ResetPasswordAdminUserInit, UnBlockAdminUserInit
} from "../../../data/actions";
import {User} from "../../../../security/data/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {filter, first} from "rxjs/operators";
import {AdminUserListFilter} from "../../../data/model/admin-user-list.filter";
import {AdminUserFormFilter} from "../../../data/model/admin-user-form.filter";
import {SortingType} from "../../../../core/data/models/sorting-type.enum";

@Component({
  selector: 'app-admin-list-page',
  templateUrl: './admin-list-page.component.html',
  styleUrls: ['./admin-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListPageComponent implements OnInit, OnDestroy {

  static AVAILABLE_SORT_FIELD = {
    email: 'email',
    lastActivity: 'lastActivity',
    fullName: 'fullName',
    signUp: 'signUp'
  };

  defaultSortField: string = AdminListPageComponent.AVAILABLE_SORT_FIELD.lastActivity;
  defaultSortType: SortingType = SortingType.DESC;

  authorizedUser: User;

  list: User[] = null;

  totalNumber: number;

  queryParamSubscription: Subscription;

  adminCreatedSubscription: Subscription;
  adminResetPasswordSubscription: Subscription;
  adminEditedSubscription: Subscription;
  adminBlockedSubscription: Subscription;
  adminUnBlockedSubscription: Subscription;
  adminDeletedSubscription: Subscription;

  searchFilter: AdminUserListFilter = {
    sortField: null,
    sortType: null,

    isBlocked: false,
    email: '',
    isDeleted: false
  }


  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private service: AdminUserService,
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.adminCreatedSubscription = this.store.pipe(
      select(state => state.admin.lastCreatedAdminUser),
      filter(result => !!result)
      )
      .subscribe(this.adminCreatedHandler);

    this.adminResetPasswordSubscription = this.store.pipe(
      select(state => state.admin.lastPasswordResetAdminUser),
      filter(result => !!result)
    )
      .subscribe(this.adminModifiedHandler);

    this.adminEditedSubscription = this.store.pipe(
      select(state => state.admin.lastEditedAdminUser),
      filter(result => !!result)
    )
      .subscribe(this.adminModifiedHandler);

    this.adminBlockedSubscription = this.store.pipe(
      select(state => state.admin.lastBlockedAdmin),
      filter(result => !!result)
    )
      .subscribe(this.adminModifiedHandler);

    this.adminUnBlockedSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockedAdmin),
      filter(result => !!result)
    )
      .subscribe(this.adminModifiedHandler);

    this.adminDeletedSubscription = this.store.pipe(
      select(state => state.admin.lastDeletedAdmin),
      filter(result => !!result)
    )
      .subscribe(this.adminModifiedHandler);

    this.queryParamSubscription = this.route.queryParams.subscribe(async (params) => {

      this.searchFilter = this.getCurrentFilter();

      this.list = null;

      await this.loadList();

    });

  }

  ngOnDestroy(): void {

    this.queryParamSubscription.unsubscribe();

    this.adminCreatedSubscription.unsubscribe();
    this.adminResetPasswordSubscription.unsubscribe();
    this.adminEditedSubscription.unsubscribe();
    this.adminBlockedSubscription.unsubscribe();
    this.adminUnBlockedSubscription.unsubscribe();
    this.adminDeletedSubscription.unsubscribe();

    this.store.dispatch(new AdminUserCreated(null));
    this.store.dispatch(new AdminUserPasswordReset(null));
    this.store.dispatch(new AdminUserEdited(null));
    this.store.dispatch(new AdminUserBlocked(null));
    this.store.dispatch(new AdminUserUnBlocked(null));
    this.store.dispatch(new AdminUserDeleted(null));
  }

  adminCreatedHandler = async (admin: User) => {

    const page = this.getCurrentListPage();
    if (page === 1)
    {
      this.list = null;
      await this.loadList();
    }
    else
    {
      await this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: 1 },
        queryParamsHandling: "merge"
      });
    }
  }

  adminModifiedHandler = (admin: User) => {

    if (!this.list)
    {
      return;
    }

    const index = this.list.findIndex(item => item.id === admin.id);
    if (index !== -1)
    {
      this.list[index] = admin;
    }

  }

  onCreateAccountClickHandler(event)
  {
    this.store.dispatch(new CreateAdminUserInit(true));
  }

  getCurrentFilter(): AdminUserListFilter
  {
    let {
      email,
      isBlocked,
      sortType,
      sortField,
      isDeleted,
    } = this.route.snapshot.queryParams;

    sortField =
      AdminListPageComponent.AVAILABLE_SORT_FIELD[sortField] ?
        AdminListPageComponent.AVAILABLE_SORT_FIELD[sortField] :
        this.defaultSortField
    ;

    sortType = !sortType ? this.defaultSortType : sortType;

    return {
      email: email,
      isBlocked: !!isBlocked ? JSON.parse(isBlocked) : null,
      isDeleted: !!isDeleted ? JSON.parse(isDeleted) : null,
      sortType: sortType,
      sortField: sortField,
    };
  }

  getCurrentListPage()
  {
    let param = !!this.route.snapshot.queryParams['page'] ? parseInt(this.route.snapshot.queryParams['page']) : 1;
    return (param > 0) ? param : 1;
  }

  async onSearchFilterChangeHandler(filter: AdminUserFormFilter)
  {
    const params = {
      ...filter,
      page: 1
    };

    await this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: "merge"
      }
    );
  }

  async onSortingFieldClickHandler(event, fieldName: string)
  {
    if (this.searchFilter.sortField !== fieldName)
    {
      this.searchFilter.sortField = fieldName;
      this.searchFilter.sortType = SortingType.DESC;
    }
    else
    {
      this.searchFilter.sortType = (this.searchFilter.sortType === SortingType.ASC) ? SortingType.DESC : SortingType.ASC;
    }

    const { sortField, sortType } = this.searchFilter;

    await this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          sortType: sortType,
          sortField: sortField
        },
        queryParamsHandling: "merge"
      }
    )
  }

  async loadList()
  {
    try {

      const filter: AdminUserListFilter = this.getCurrentFilter();
      const page: number = this.getCurrentListPage();

      const { list, totalNumber } = await this.service.getList(filter, page).toPromise();
      this.totalNumber = totalNumber;

      if (!this.list)
      {
        this.list = [];
      }

      if (list.length > 0)
      {
        this.list = this.list.concat(list);
      }
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'CANNOT_LOAD_USERS', 'ERROR')
      ));

      await this.router.navigateByUrl('/');
    }
  }


  onChangePasswordHandler(user: User)
  {
    this.store.dispatch(new ResetPasswordAdminUserInit(user));
  }

  onEditHandler(user: User)
  {
    this.store.dispatch(new EditAdminUserInit(user));
  }

  onBlockHandler(user: User)
  {
    this.store.dispatch(new BlockAdminUserInit(user));
  }

  onUnBlockHandler(user: User)
  {
    this.store.dispatch(new UnBlockAdminUserInit(user));
  }

  onDeleteHandler(user: User)
  {
    this.store.dispatch(new DeleteAdminUserInit(user));
  }


}
