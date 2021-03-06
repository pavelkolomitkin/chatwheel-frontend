import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../../../security/data/models/user.model";
import {filter, first} from "rxjs/operators";
import {UserProfileService} from "../../../services/user-profile.service";
import {GlobalProgressHide, GlobalProgressShow} from "../../../../core/data/actions";
import {PAGE_NOT_FOUND_ROUTE} from "../../../client-routing.module";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: User = null;
  authorizedUser: User = null;

  routeParamsSubscription: Subscription = null;
  banChangedUserSubscription: Subscription = null;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserProfileService
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

    this.routeParamsSubscription = this.route.params.subscribe( async (params) => {

      this.disposeBanUserSubscription();

      this.user = null;

      const userId: string = params['id'];
      if (userId === this.authorizedUser.id)
      {
        await this.router.navigateByUrl('/profile/me');
        return;
      }

      this.store.dispatch(new GlobalProgressShow());

      try {
        this.user = await this.service.get(userId).toPromise();
      }
      catch (error)
      {
        await this.router.navigateByUrl(PAGE_NOT_FOUND_ROUTE);
        return;
      }
      finally {
        this.store.dispatch(new GlobalProgressHide());
      }

      this.initBanUserSubscription();
    });


  }

  initBanUserSubscription()
  {
    this.banChangedUserSubscription = this.store.pipe(
      select(state => state.client.lastBanStatusChangedUser),
      filter(user => !!user)
    ).subscribe((user) => {
      if (this.user.id === user.id)
      {
        this.user = user;
      }
    });
  }

  disposeBanUserSubscription()
  {
    if (!!this.banChangedUserSubscription)
    {
      this.banChangedUserSubscription.unsubscribe();
      this.banChangedUserSubscription = null;
    }
  }


  ngOnDestroy(): void {

    if (!!this.routeParamsSubscription)
    {
      this.routeParamsSubscription.unsubscribe();
      this.routeParamsSubscription = null
    }

    this.disposeBanUserSubscription();
  }

}
