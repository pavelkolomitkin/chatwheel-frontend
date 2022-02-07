import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SecurityService} from "../../services/security.service";
import {State} from "../reducer";
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../core/services/local-storage.service";
import {NgxPermissionsService} from "ngx-permissions";
import {
  USER_CHANGE_PASSWORD_START,
  USER_INITIALIZATION_ERROR,
  USER_INITIALIZATION_START,
  USER_INITIALIZATION_SUCCESS,
  USER_LOGIN_START,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_TOKEN_INITIALIZE_STORE, UserChangePasswordError,
  UserChangePasswordStart,
  UserChangePasswordSuccess,
  UserInitializationError,
  UserInitializationStart,
  UserInitializationSuccess,
  UserLoginError,
  UserLoginStart,
  UserLoginSuccess,
  UserLogout,
  UserTokenInitializesStore
} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {ProfileService} from "../../services/profile.service";
import {User} from "../models/user.model";
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";

@Injectable()
export class AuthEffects
{
  loginStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_LOGIN_START),
      tap(() => {
        this.permissionService.loadPermissions([]);
        this.localStorage.remove(LocalStorageService.TOKEN_KEY);
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((action: UserLoginStart) => {
        const { credentials } = action;

        //debugger
        return this.service.login(credentials).pipe(
          map((token: string) => {
            //debugger
            return new UserLoginSuccess(token, action.rememberUser);
          }),
          catchError((errors) => {
            //debugger
            return of(new UserLoginError(errors.error.errors));
          })
        )
      }),
      tap((action) => {
        this.store.dispatch(new GlobalProgressHide());
      })
    )
  });

  loginSuccess: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_LOGIN_SUCCESS),
      tap((action: UserLoginSuccess) => {

        //debugger
        this.localStorage.set(LocalStorageService.TOKEN_KEY, action.token, action.rememberUser);

        this.store.dispatch(new UserInitializationStart());
      })
    )
  }, { dispatch: false })

  initializationStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_INITIALIZATION_START),
      tap((action: UserInitializationStart) => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((action: UserInitializationStart) => {
        return this.profileService.getProfile().pipe(
          map((user: User) => {
            //debugger
            return new UserInitializationSuccess(user);
          }),
          catchError((error) => {
            //debugger
            return of(new UserInitializationError());
          })
        )
      }),
      tap((action) => {
        this.store.dispatch(new GlobalProgressHide());
      })
    )
  });

  initializationSuccess: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_INITIALIZATION_SUCCESS),
      tap((action: UserInitializationSuccess) => {
        //debugger
        const { user: { roles } } = action;

        this.permissionService.loadPermissions(roles);

        //this.router.navigate(['/'])
      }),
    )
  }, { dispatch: false });

  initializationError: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_INITIALIZATION_ERROR, USER_LOGOUT),
      tap((action) => {
        //debugger

        this.localStorage.remove(LocalStorageService.TOKEN_KEY);
        this.permissionService.loadPermissions([]);

        this.router.navigate(['/security', 'login'])
      })
    )
  }, { dispatch: false });

  changePasswordStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_CHANGE_PASSWORD_START),
      tap((action: UserChangePasswordStart) => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((action: UserChangePasswordStart) => {
        return this.service.restorePassword(action.data).pipe(
          map(() => {
            return new UserChangePasswordSuccess();
          }),
          catchError((errors) => {
            return of(new UserChangePasswordError(errors.error.errors));
          })
        );
      }),
      tap(() => {
        this.store.dispatch(new GlobalProgressHide());
      }),
    )
  })

  constructor(
    private actions: Actions,
    private service: SecurityService,
    private profileService: ProfileService,
    private store: Store<State>,
    private router: Router,
    private localStorage: LocalStorageService,
    private permissionService: NgxPermissionsService
    ) {
  }
}
