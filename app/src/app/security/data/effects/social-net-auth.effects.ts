import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {State} from "../reducer";
import {Observable, of} from "rxjs";
import {USER_SOCIAL_NET_LOGIN_START, UserLoginError, UserLoginSuccess, UserSocialNetLoginStart} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {VkAuthService} from "../../services/vk-auth.service";
import {SocialMediaType} from "../models/user.model";
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {FbAuthService} from "../../services/fb-auth.service";

@Injectable()
export class SocialNetAuthEffects
{

  loginStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_SOCIAL_NET_LOGIN_START),
      tap(() => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((action: UserSocialNetLoginStart) => {

        const { credentials } = action;

        if (credentials.mediaType === SocialMediaType.VK)
        {
          const { credentials: { accessToken, userId } } = action;

          return this.vkAuthService.auth(accessToken, userId).pipe(
            map((token: string) => {
              return new UserLoginSuccess(token, true);
            }),
            catchError((errors) => {
              return of(new UserLoginError(errors.error.errors));
            })
          );
        }
        else if (credentials.mediaType === SocialMediaType.FB)
        {
          const { credentials: { accessToken, code } } = action;

          return this.fbAuthService.auth(accessToken, code).pipe(
            map((token: string) => {
              return new UserLoginSuccess(token, true);
            }),
            catchError((errors) => {
              return of(new UserLoginError(errors));
            })
          );
        }
        else
        {
          throw new Error('You should implement this authorization method!');
        }

      }),
      tap(() => {
        this.store.dispatch(new GlobalProgressHide());
      })
    )
  });

  constructor(
    private actions: Actions,
    private vkAuthService: VkAuthService,
    private fbAuthService: FbAuthService,
    private store: Store<State>,
  ) {
  }
}
