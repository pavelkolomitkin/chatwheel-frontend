import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
import {VkAuthService} from '../../../services/vk-auth.service';
import {UserSocialNetLoginStart} from '../../../data/actions';
import {SocialNetLoginCredentials} from '../../../data/models/social-net-login-credentials.model';
import {SocialMediaType, User} from '../../../data/models/user.model';
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.css']
})
export class SocialAuthComponent implements OnInit, OnDestroy {

  routeParamsSubscription: Subscription;
  userInitSubscription: Subscription;

  errorMessage: string = null;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.userInitSubscription = this.store.pipe(select(state => state.security.user),
      filter(user => !!user))
      .subscribe(async (user: User) => {
        await this.router.navigateByUrl('/');
      });


    this.routeParamsSubscription = this.route.params.subscribe(async (params) => {

      const { type } = params;
      if (type === 'vk')
      {
        await this.handleVKAuthorization();
      }

    });
  }

  ngOnDestroy(): void {

    this.routeParamsSubscription.unsubscribe();
    this.userInitSubscription.unsubscribe();

  }

  async handleVKAuthorization()
  {
    let accessToken: string = null;
    let userId: string = null;

    this.route.snapshot.fragment.split('&').forEach((item) => {

      const fragment = item.split('=');
      if (fragment[0] === 'access_token')
      {
        accessToken = fragment[1];
      }
      if (fragment[0] === 'user_id')
      {
        userId = fragment[1];
      }

    });

    const credentials: SocialNetLoginCredentials = new SocialNetLoginCredentials();

    credentials.userId = userId;
    credentials.accessToken = accessToken;
    credentials.mediaType = SocialMediaType.VK;

    this.store.dispatch(new UserSocialNetLoginStart(credentials));
  }

}
