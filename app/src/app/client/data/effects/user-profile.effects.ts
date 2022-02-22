import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {
  USER_BLOCK_TOGGLE_ERROR,
  USER_BLOCK_TOGGLE_START,
  UserBlockToggleError,
  UserBlockToggleStart,
  UserBlockToggleSuccess
} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {UserProfileService} from "../../services/user-profile.service";
import {User} from "../../../security/data/models/user.model";
import {GlobalNotification} from "../../../core/data/actions";
import {Notification, NotificationType} from "../../../core/data/models/notification.model";

@Injectable()
export class UserProfileEffects
{
  // @ts-ignore
  blockToggleStart: Observable<Action> = createEffect(() => {

    return this.actions.pipe(
      ofType(USER_BLOCK_TOGGLE_START),
      mergeMap((action: UserBlockToggleStart) => {

        const { block, user } = action;

        debugger

        let result = null;
        if (block)
        {
          result = this.service.banUser(user);
        }
        else
        {
          result = this.service.unbanUser(user);
        }

        return result.pipe(
          map((user: User) => {
            return new UserBlockToggleSuccess(user);
          }),
          catchError((errors) => {
            return of(new UserBlockToggleError(errors));
          })
        );
      })
    );
  });

  userBlockToggleError = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_BLOCK_TOGGLE_ERROR),
      tap((action: UserBlockToggleError) => {

        const message = action.errors.error.errors.message;

        this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, message, 'Error')));

      })
    )
  }, { dispatch: false })


  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: UserProfileService
  ) {
  }
}
