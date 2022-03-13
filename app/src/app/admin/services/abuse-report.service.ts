import {BaseService} from "../../core/services/base.service";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";

@Injectable()
export class AbuseReportService extends BaseService
{
  getNewNumber()
  {
    return this.http.get<{ number: number }>('/admin/abuse-report/new-number').pipe(
      map(data => data.number)
    );
  }
}
