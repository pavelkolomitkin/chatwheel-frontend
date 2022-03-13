import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START,
  GetTotalNumberClientUsersError,
  GetTotalNumberClientUsersStart, GetTotalNumberClientUsersSuccess
} from "../actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {ClientUserService} from "../../services/client-user.service";

@Injectable()
export class ClientUserEffects
{
  getNumberStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_GET_TOTAL_NUMBER_CLIENT_USERS_START),
      mergeMap((action: GetTotalNumberClientUsersStart) => {

        const { authType } = action;

        return this.service.getNumber(authType).pipe(
          map((number: number) => {
            return new GetTotalNumberClientUsersSuccess(number, authType)
          }),
          catchError((errors) => {
            return of(new GetTotalNumberClientUsersError(errors));
          })
        );
      }),
    )
  });


  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: ClientUserService
  ) {
  }
}
