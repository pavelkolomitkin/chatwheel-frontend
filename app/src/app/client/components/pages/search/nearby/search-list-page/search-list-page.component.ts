import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {GeoSearchService} from "../../../../../services/search/geo-search.service";
import {User} from "../../../../../../security/data/models/user.model";
import {GlobalNotification} from "../../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../../core/data/models/notification.model";
import {Router} from "@angular/router";
import {filter, first} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Geolocation, isEqual} from "../../../../../../core/data/models/geolocation.model";

@Component({
  selector: 'app-search-list-page',
  templateUrl: './search-list-page.component.html',
  styleUrls: ['./search-list-page.component.css']
})
export class SearchListPageComponent implements OnInit, OnDestroy {

  authorizedUser: User;

  userListPage: number = 1;

  infiniteScrollDisabled: boolean = true;

  list: User[] = [];

  userUpdateSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private service: GeoSearchService,
    private router: Router
  ) { }

  async ngOnInit(){

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.userUpdateSubscription = this.store.pipe(
      select(state => state.security.user),
      filter(user => !!user)
    ).subscribe(async (user) => {

      const oldLocation: Geolocation = this.authorizedUser.geoLocation;
      const newLocation: Geolocation = user.geoLocation;

      this.authorizedUser = user;
      if (!isEqual(oldLocation, newLocation))
      {
        this.list = [];
        await this.loadUsers();
      }

    });

    await this.loadUsers();
  }

  ngOnDestroy(): void {
    this.userUpdateSubscription.unsubscribe();
  }

  async loadUsers()
  {

    this.infiniteScrollDisabled = true;

    try {

      const users: User[] = await this.service.getUsersNearBy(this.userListPage).toPromise();
      this.userListPage++;

      if (users.length > 0)
      {
        this.list = this.list.concat(users);
        this.infiniteScrollDisabled = false;
      }
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, 'Cannot load this page', 'Error')));
      await this.router.navigateByUrl('/');
    }
  }

  async onScroll()
  {
    await this.loadUsers();
  }
}
