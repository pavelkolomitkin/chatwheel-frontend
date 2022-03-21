import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {
  AbuseReportRead, AbuseReportReadError, AbuseReportReadSuccess,
  ADMIN_ABUSE_REPORT_READ,
} from "../actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {AbuseReportService} from "../../services/abuse-report.service";
import {AbuseReport} from "../../../core/data/models/abuse-report.model";



@Injectable()
export class AbuseReportEffects
{
  readStart: Observable<Action> = createEffect(() => {

    return this.actions.pipe(
      ofType(ADMIN_ABUSE_REPORT_READ),
      mergeMap((action: AbuseReportRead) => {

        return this.service.read(action.report).pipe(
          map((report: AbuseReport) => {
            return new AbuseReportReadSuccess(report);
          }),
          catchError(error => {
            return of(new AbuseReportReadError(error));
          })
        );
      })
    );

  })

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: AbuseReportService
  ) {
  }
}
