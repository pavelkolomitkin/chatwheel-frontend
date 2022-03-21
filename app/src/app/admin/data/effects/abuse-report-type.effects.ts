import {Action, Store} from '@ngrx/store';
import {State} from '../../../app.state';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  ADMIN_GET_ABUSE_REPORT_TYPES_START,
  GetAbuseReportTypesError,
  GetAbuseReportTypesStart,
  GetAbuseReportTypesSuccess
} from '../actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AbuseReportTypeService} from '../../../core/services/abuse-report-type.service';
import {AbuseReportType} from '../../../core/data/models/abuse-report-type.model';
import {Injectable} from "@angular/core";

@Injectable()
export class AbuseReportTypeEffects
{
  loadStart: Observable<Action> = createEffect(() => {
    return this.actions.pipe(ofType(ADMIN_GET_ABUSE_REPORT_TYPES_START),
      mergeMap((action: GetAbuseReportTypesStart) => {
        return this.service.getList().pipe(
          map((list: AbuseReportType[]) => {
            return new GetAbuseReportTypesSuccess(list);
          }),
          catchError((errors) => {
            return of(new GetAbuseReportTypesError(errors));
          })
        )
      })
    );
  })

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: AbuseReportTypeService
  ) {
  }
}
