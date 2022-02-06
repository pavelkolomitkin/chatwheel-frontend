import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SecurityService} from "../../services/security.service";
import {State} from "../reducer";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {NgxPermissionsService} from "ngx-permissions";
import {USER_LOGIN_START, USER_LOGIN_SUCCESS, UserLoginError, UserLoginStart, UserLoginSuccess} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";

@Injectable()
export class AuthEffects
{
  loginStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_LOGIN_START),

      mergeMap((action: UserLoginStart) => {
        const { credentials } = action;

        return this.service.login(credentials).pipe(
          map((token: string) => {
            return new UserLoginSuccess(token, action.rememberUser);
          }),
          catchError((errors) => {
            return of(new UserLoginError(errors));
          })
        )
      })

    )
  });

  loginSuccess: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_LOGIN_SUCCESS),
      tap((action: UserLoginSuccess) => {
        this.router.navigate(['/'])
      })
    )
  }, { dispatch: false }
  )

  constructor(
    private actions: Actions,
    private service: SecurityService,
    private store: Store<State>,
    private router: Router,
    private localStorage: LocalStorageService,
    private permissionService: NgxPermissionsService
    ) {
  }
}
