import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  ADMIN_BLOCK_USER_START,
  ADMIN_DELETE_USER_START,
  ADMIN_GET_USER_NUMBER,
  ADMIN_UNBLOCK_USER_START,
  BlockUserError,
  BlockUserStart,
  BlockUserSuccess,
  DeleteUserError,
  DeleteUserStart,
  DeleteUserSuccess,
  GetClientUserNumber,
  GetClientUserNumberSuccess,
  UnBlockUserError,
  UnBlockUserStart,
  UnBlockUserSuccess
} from "../actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ClientUserService} from "../../services/client-user.service";
import {User} from "../../../security/data/models/user.model";

@Injectable()
export class ClientUserEffects
{
  blockStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_BLOCK_USER_START),
      mergeMap(({ user, reason }: BlockUserStart) => {

        return this.service.blockUser(user, { reason }).pipe(
          map((user: User) => {
            return new BlockUserSuccess(user);
          }),
          catchError((error) => {
            return of(new BlockUserError(user, error));
          })
        );
      })
    )
  });

  unBlockUserStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_UNBLOCK_USER_START),
      mergeMap(({ user }: UnBlockUserStart) => {

        return this.service.unBlockUser(user).pipe(
          map((user: User) => {
            return new UnBlockUserSuccess(user);
          }),
          catchError(error => {
            return of(new UnBlockUserError(user, error));
          })
        );
      })
    )
  });


  deleteUserStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_DELETE_USER_START),
      mergeMap(({ user }: DeleteUserStart) => {
        return this.service.deleteUser(user).pipe(
          map((user: User) => {
            return new DeleteUserSuccess(user);
          }),
          catchError(error => {
            return of(new DeleteUserError(user, error));
          })
        );

      })
    )
  })


  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: ClientUserService
  ) {
  }
}
