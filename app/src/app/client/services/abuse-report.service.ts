import {BaseService} from "../../core/services/base.service";
import {Injectable} from "@angular/core";
import {User} from "../../security/data/models/user.model";
import {AbuseReportType} from "../../core/data/models/abuse-report-type.model";
import {map} from "rxjs/operators";

@Injectable()
export class AbuseReportService extends BaseService
{
  create(recipient: User, type: AbuseReportType, comment: string = null)
  {
    return this.http.post<{ user: User, isBanned: boolean, amIBanned: boolean }>('/client/abuse-report', {
      recipientId: recipient.id,
      typeId: type.id,
      comment: comment
    }).pipe(
      map(({ user, amIBanned, isBanned }) => {
        const result: User = User.createFromRawData(user);

        result.amIBanned = amIBanned;
        result.isBanned = isBanned;

        return result;
      })
    )
  }
}
