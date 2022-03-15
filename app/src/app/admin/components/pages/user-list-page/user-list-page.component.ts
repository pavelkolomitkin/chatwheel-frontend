import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ClientUserService} from "../../../services/client-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ClientUserListFilter} from "../../../data/model/client-user-list.filter";
import {User} from "../../../../security/data/models/user.model";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {BlockUserInit, DeleteUserInit, UnBlockUserInit} from "../../../data/actions";
import {filter, first} from "rxjs/operators";
import {SortingType} from "../../../../core/data/models/sorting-type.enum";
import {Country} from "../../../../core/data/models/country.model";
import {FormFilterData} from "./user-list-filter-form/user-list-filter-form.component";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListPageComponent implements OnInit, OnDestroy {

  static AVAILABLE_SORT_FIELD = {
    lastActivity: 'lastActivity',
    fullName: 'fullName',
    signUp: 'signUp'
  };

  paramSubscription: Subscription = null;

  userBlockedSubscription: Subscription = null;
  userUnBlockedSubscription: Subscription = null;
  userDeletedSubscription: Subscription = null;


  defaultSortField: string = UserListPageComponent.AVAILABLE_SORT_FIELD.lastActivity;
  defaultSortType: SortingType = SortingType.DESC;

  currentFilter: ClientUserListFilter = {
    authType: null,
    isNotActivated: null,
    isBlocked: null,
    residenceCountry: null,
    searchCountry: null,
    sortType: null,
    sortField: null,
    isDeleted: null
  }

  countries: Country[] = null;


  list: User[] = null;
  totalNumber: number = null;

  constructor(
    private store: Store<State>,
    private service: ClientUserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {

    this.countries = await this.store.pipe(
      select(state => state.core.countries),
      filter(countries => countries.length > 0),
      first()).toPromise();

    this.paramSubscription = this.route.queryParams.subscribe(async (params) => {

      this.releaseUserManagementSubscriptions();


      this.initUserManagementSubscriptions();

      this.currentFilter = this.getCurrentFilter();

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

  userModifiedHandler = async (user: User) => {

    await this.loadUsers();
    /*const index = this.list.findIndex(item => item.id === user.id);
    if (index !== -1)
    {
      this.list[index] = user;
    }

    const params = {
      ...this.getCurrentFilter(),
      page: this.getCurrentListPage()
    }

    await this.router.navigate(
      [],
        {
          relativeTo: this.route,
          queryParams: params,
          queryParamsHandling: "merge",
        }
      );
    */
  }

  getCurrentFilter(): ClientUserListFilter
  {
    let {
      authType,
      isNotActivated,
      isBlocked,
      residenceCountry,
      searchCountry,
      sortType,
      sortField,
      isDeleted,
    } = this.route.snapshot.queryParams;

    sortField =
      UserListPageComponent.AVAILABLE_SORT_FIELD[sortField] ?
        UserListPageComponent.AVAILABLE_SORT_FIELD[sortField] :
        this.defaultSortField
    ;

    sortType = !sortType ? this.defaultSortType : sortType;

    return {
      authType: authType,
      isNotActivated: !!isNotActivated ? JSON.parse(isNotActivated) : null,
      isBlocked: !!isBlocked ? JSON.parse(isBlocked) : null,
      residenceCountry: !!residenceCountry ? this.countries.find(country => country.id === residenceCountry) : null,
      searchCountry: !!searchCountry ? this.countries.find(country => country.id === searchCountry) : null,
      sortType: sortType,
      sortField: sortField,
      isDeleted: !!isDeleted ? JSON.parse(isDeleted) : null
    };
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

  async onSortingFieldClickHandler(event, fieldName: string)
  {
    if (this.currentFilter.sortField !== fieldName)
    {
      this.currentFilter.sortField = fieldName;
      this.currentFilter.sortType = SortingType.DESC;
    }
    else
    {
      this.currentFilter.sortType = (this.currentFilter.sortType === SortingType.ASC) ? SortingType.DESC : SortingType.ASC;
    }

    const { sortField, sortType } = this.currentFilter;

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

  async onFilterFormChangeHandler(data: FormFilterData)
  {
    const params: any = {
      ...data,
      residenceCountry: data.residenceCountry ? data.residenceCountry.id : '',
      searchCountry: data.searchCountry ? data.searchCountry.id : '',
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

}
