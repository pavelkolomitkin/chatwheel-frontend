import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {State} from "../reducer";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {
  USER_REGISTER_CONFIRM_START, USER_REGISTER_CONFIRM_SUCCESS,
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS,
  UserInitializationStart,
  UserRegisterConfirmError,
  UserRegisterConfirmStart,
  UserRegisterConfirmSuccess,
  UserRegisterError,
  UserRegisterStart,
  UserRegisterSuccess, UserTokenInitializesStore
} from "../actions";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {SecurityService} from "../../services/security.service";
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {LocalStorageService} from "../../../core/services/local-storage.service";

@Injectable()
export class RegisterEffects
{
  registerStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_REGISTER_START),
      tap((action: UserRegisterStart) => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((actions: UserRegisterStart) => {
        return this.service.register(actions.data).pipe(
          map(() => {
            return new UserRegisterSuccess();
          }),
          catchError((errors) => {

            return of(new UserRegisterError(errors.error.errors));
          })
        )
      }),
      tap(() => {
        this.store.dispatch(new GlobalProgressHide());
      }),
    )
  });

  registerSuccess: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_REGISTER_SUCCESS),
      tap((action: UserRegisterSuccess) => {
        this.router.navigateByUrl('/security/register-success');
      })
    )
  }, { dispatch: false })


  registerConfirmStart = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_REGISTER_CONFIRM_START),
      tap(() => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap(({ key }: UserRegisterConfirmStart) => {

        return this.service.registerConfirm(key).pipe(
          map((token: string) => {

            return new UserRegisterConfirmSuccess(token);
          }),
          catchError(() => {

            return of(new UserRegisterConfirmError());
          })
        );
      }),
      tap(() => {
        this.store.dispatch(new GlobalProgressHide());
      })
    )
  })

  registerConfirmSuccess = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_REGISTER_CONFIRM_SUCCESS),
      tap((action: UserRegisterConfirmSuccess) => {


        const { token } = action;

        this.localStorage.set(LocalStorageService.TOKEN_KEY, token)
        this.store.dispatch(new UserTokenInitializesStore(token));
        this.store.dispatch(new UserInitializationStart());
      })
    )
  }, { dispatch: false })

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: SecurityService,
    private localStorage: LocalStorageService
  ) {
  }
}
