import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProfileService} from "../../services/profile.service";
import {Observable, of} from "rxjs";
import {
  USER_DELETE_ACCOUNT_START,
  USER_DELETE_ACCOUNT_SUCCESS,
  UserDeleteAccountError,
  UserDeleteAccountStart,
  UserDeleteAccountSuccess
} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {GlobalNotification, GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {Router} from "@angular/router";
import {Notification, NotificationType} from "../../../core/data/models/notification.model";
import {UserLogout} from "../../../security/data/actions";

@Injectable()
export class ProfileEffects
{
  deleteAccountStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_DELETE_ACCOUNT_START),
      tap(() => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((action: UserDeleteAccountStart) => {
        return this.profileService.deleteAccount().pipe(
          map((user) => {
            return new UserDeleteAccountSuccess();
          }),
          catchError(() => {
            return of(new UserDeleteAccountError())
          })
        )
      }),
      tap(() => {
        this.store.dispatch(new GlobalProgressHide());
      }),
    );
  })

  deleteAccountSuccess: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_DELETE_ACCOUNT_SUCCESS),
      tap(() => {
        this.store.dispatch(new GlobalNotification(new Notification(NotificationType.WARNING, 'Your account was successfully removed!', 'So sorry!')));
        this.store.dispatch(new UserLogout());
        this.router.navigateByUrl('/');
      })
    )
  }, { dispatch: false })

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private profileService: ProfileService,
    private router: Router
  ) {
  }
}
