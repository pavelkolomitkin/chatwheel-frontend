import {Injectable} from "@angular/core";
import {Action, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {
  USER_REPORT_ABUSE_ERROR,
  USER_REPORT_ABUSE_START,
  UserReportAbuseError,
  UserReportAbuseStart,
  UserReportAbuseSuccess
} from "../actions";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {User} from "../../../security/data/models/user.model";
import {AbuseReportService} from "../../services/abuse-report.service";
import {GlobalNotification, GlobalProgressHide, GlobalProgressShow} from "../../../core/data/actions";
import {Notification, NotificationType} from "../../../core/data/models/notification.model";


@Injectable()
export class ReportAbuseEffects
{

  reportStart: Observable<Action> = createEffect(() => {

    return this.actions.pipe(
      ofType(USER_REPORT_ABUSE_START),
      tap(() => {
        this.store.dispatch(new GlobalProgressShow());
      }),
      mergeMap((action: UserReportAbuseStart) => {

        const { recipient, abuseType, comment } = action;

        return this.service.create(recipient, abuseType, comment).pipe(
          map((user: User) => {
            return new UserReportAbuseSuccess(user);
          }),
          catchError((errors) => {
            return of(new UserReportAbuseError(errors));
          })
        );
      }),
      tap(() => {
        this.store.dispatch(new GlobalProgressHide());
      })
    );
  });

  reportUserError: Observable<Action> = createEffect(() => {
    return this.actions.pipe(
      ofType(USER_REPORT_ABUSE_ERROR),
      tap((action: UserReportAbuseError) => {

        const message = action.errors.error.errors.message;

        this.store.dispatch(new GlobalNotification(new Notification(NotificationType.ERROR, message, 'Error')));
      })
    );
  }, { dispatch: false })

  constructor(
    private store: Store<State>,
    private actions: Actions,
    private service: AbuseReportService
  ) {
  }
}
