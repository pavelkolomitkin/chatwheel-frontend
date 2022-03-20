import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {ClientUserStatisticsService} from "../../services/statistics/client-user-statistics.service";
import {Observable} from "rxjs";
import {ADMIN_GET_USER_NUMBER, GetClientUserNumber, GetClientUserNumberSuccess} from "../actions";
import {map, mergeMap} from "rxjs/operators";

@Injectable()
export class StatisticsEffects
{

  getClientUserNumber: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_GET_USER_NUMBER),
      mergeMap((action: GetClientUserNumber) => {

        return this.userStatistics.getNumber().pipe(
          map(({ total, emailNumber, vkNumber }) => {
            return new GetClientUserNumberSuccess(total, emailNumber, vkNumber);
          }),
        );
      }),
    )
  });

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private userStatistics: ClientUserStatisticsService
  ) {
  }
}
