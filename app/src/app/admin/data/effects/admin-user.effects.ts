import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AdminUserService} from "../../services/admin-user.service";
import {Observable, of} from "rxjs";
import {
  ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS,
  GetTotalNumberAdminUsersError,
  GetTotalNumberAdminUsersSuccess
} from "../actions";
import {catchError, map, mergeMap} from "rxjs/operators";

@Injectable()
export class AdminUserEffects
{

  getTotalNumberStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_GET_TOTAL_NUMBER_ADMIN_USERS),
      mergeMap(() => {
        return this.service.getNumber().pipe(
          map((totalNumber) => {
            return new GetTotalNumberAdminUsersSuccess(totalNumber);
          }),
          catchError((errors) => {
            return of(new GetTotalNumberAdminUsersError(errors));
          })
        );
      })
    );
  })

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: AdminUserService
  ) {
  }
}
