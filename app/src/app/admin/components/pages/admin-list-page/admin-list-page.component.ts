import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {AdminUserService} from "../../../services/admin-user.service";
import {Observable, Subscription} from "rxjs";
import {AdminUserCreated, CreateAdminUserInit, GetTotalNumberAdminUsersSuccess} from "../../../data/actions";
import {User} from "../../../../security/data/models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {filter, first} from "rxjs/operators";

@Component({
  selector: 'app-admin-list-page',
  templateUrl: './admin-list-page.component.html',
  styleUrls: ['./admin-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListPageComponent implements OnInit, OnDestroy {

  authorizedUser: User;

  list: User[] = null;

  totalNumber: Observable<number>;

  queryParamSubscription: Subscription;
  adminCreatedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private service: AdminUserService,
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.totalNumber = this.store.pipe(select(state => state.admin.adminTotalNumber));

    this.adminCreatedSubscription = this.store.pipe(
      select(state => state.admin.lastCreatedAdminUser),
      filter(result => !!result)
      )
      .subscribe(this.adminCreatedHandler);

    this.queryParamSubscription = this.route.queryParams.subscribe(async (params) => {

      this.list = null;

      await this.loadList();

    });

  }

  ngOnDestroy(): void {

    this.queryParamSubscription.unsubscribe();
    this.adminCreatedSubscription.unsubscribe();

    this.store.dispatch(new AdminUserCreated(null));
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

  onCreateAccountClickHandler(event)
  {
    this.store.dispatch(new CreateAdminUserInit(true));
  }

  getCurrentListPage()
  {
    let param = !!this.route.snapshot.queryParams['page'] ? parseInt(this.route.snapshot.queryParams['page']) : 1;
    return (param > 0) ? param : 1;
  }

  async loadList()
  {
    try {

      const page: number = this.getCurrentListPage();

      const { list, totalNumber } = await this.service.getList(page).toPromise();

      if (!this.list)
      {
        this.list = [];
      }

      if (list.length > 0)
      {
        this.list = this.list.concat(list);
      }

      this.store.dispatch(new GetTotalNumberAdminUsersSuccess(totalNumber));
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'CANNOT_LOAD_USERS', 'ERROR')
      ));

      await this.router.navigateByUrl('/');
    }
  }
}
