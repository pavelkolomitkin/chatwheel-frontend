import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {State} from '../../../../app.state';
import {Subscription} from 'rxjs';
import {UserLoginError, UserSocialNetLoginStart} from '../../../data/actions';
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
  errorSubscription: Subscription;

  authorizationType: string;

  errorMessage: string = null;

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.store.dispatch(new UserLoginError({}));

    this.userInitSubscription = this.store.pipe(select(state => state.security.user),
      filter(user => !!user))
      .subscribe(async (user: User) => {
        await this.router.navigateByUrl('/');
      });

    this.errorSubscription = this.store.pipe(
      select(state => state.security.loginErrors),
      filter(result => Object.keys(result).length > 0)
    ).subscribe(result => {
      this.errorMessage = 'AUTHORIZATION_ERROR';
    });

    this.routeParamsSubscription = this.route.params.subscribe(async (params) => {

      const { type } = params;
      this.authorizationType = type;

      if (this.authorizationType === 'vk')
      {
        await this.handleVKAuthorization();
      }

      if (this.authorizationType == 'fb')
      {
        await this.handleFbAuthorization();
      }

    });
  }

  ngOnDestroy(): void {

    this.routeParamsSubscription.unsubscribe();
    this.userInitSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();

  }

  getFragmentParameter(paramName: string)
  {
    let result: string = null;

    const fragmentPairs = this.route.snapshot.fragment.split('&');
    for (let item of fragmentPairs)
    {
      const fragment = item.split('=');
      if (fragment[0] === paramName)
      {
        result = fragment[1];
        break;
      }
    }

    return result;
  }

  async handleVKAuthorization()
  {
    let accessToken: string = this.getFragmentParameter('access_token');
    let userId: string = this.getFragmentParameter('user_id');


    const credentials: SocialNetLoginCredentials = new SocialNetLoginCredentials();

    credentials.userId = userId;
    credentials.accessToken = accessToken;
    credentials.mediaType = SocialMediaType.VK;

    this.store.dispatch(new UserSocialNetLoginStart(credentials));
  }

  async handleFbAuthorization()
  {
    let accessToken: string = this.getFragmentParameter('access_token');
    let code: string = this.getFragmentParameter('code');


    const credentials: SocialNetLoginCredentials = new SocialNetLoginCredentials();

    credentials.accessToken = accessToken;
    credentials.code = code;
    credentials.mediaType = SocialMediaType.FB;

    this.store.dispatch(new UserSocialNetLoginStart(credentials));
  }

}
