import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {
  ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START, GetNewAbuseReportNumberError,
  GetNewAbuseReportNumberStart,
  GetNewAbuseReportNumberSuccess
} from "../actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {AbuseReportService} from "../../services/abuse-report.service";



@Injectable()
export class AbuseReportEffects
{
  getNewNumberStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(ADMIN_GET_NEW_ABUSE_REPORT_NUMBER_START),
      mergeMap((action: GetNewAbuseReportNumberStart) => {
        return this.service.getNewNumber().pipe(
          map((number) => {
            return new GetNewAbuseReportNumberSuccess(number);
          }),
          catchError(errors => {
            return of(new GetNewAbuseReportNumberError(errors));
          })
        )
      })
    )
  });

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: AbuseReportService
  ) {
  }
}
