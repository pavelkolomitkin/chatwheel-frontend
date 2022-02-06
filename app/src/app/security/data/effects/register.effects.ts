import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Action, Store} from "@ngrx/store";
import {State} from "../reducer";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {
  USER_REGISTER_START,
  USER_REGISTER_SUCCESS, UserInitializationStart,
  UserRegisterError,
  UserRegisterStart,
  UserRegisterSuccess
} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {SecurityService} from "../../services/security.service";
import {GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";

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
            debugger
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

  constructor(
    private actions: Actions,
    private store: Store<State>,
    private router: Router,
    private service: SecurityService
  ) {
  }
}
