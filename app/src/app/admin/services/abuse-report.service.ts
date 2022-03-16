import {BaseService} from "../../core/services/base.service";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";
import {User} from "../../security/data/models/user.model";
import {HttpParams} from "@angular/common/http";
import {AbuseReport} from "../../core/data/models/abuse-report.model";

@Injectable()
export class AbuseReportService extends BaseService
{
  getNewNumber()
  {
    return this.http.get<{ number: number }>('/admin/abuse-report/new-number').pipe(
      map(data => data.number)
    );
  }

  getNumberPeopleApplied(addressee: User)
  {
    return this.http.get<{ number: number }>('/admin/abuse-report/people-applied/' + addressee.id)
      .pipe(
        map(data => data.number)
      );
  }

  getReportNumberReceived(addressee: User)
  {
    return this.http.get<{ total: number, newNumber: number }>('/admin/abuse-report/report-number-received/' + addressee.id);
  }

  getAddresseeList(addressee: User, latest: AbuseReport = null, lastDate: string = null)
  {
    const params: HttpParams = this.getHttpParamsFromObject({
      lastDate,
      latestId: latest ? latest.id : null
    });

    return this.http.get<{ reports: any[] }>('/admin/abuse-report/addressee-reports/' + addressee.id, { params })
      .pipe(
        map((data) => {
          return data.reports.map(item => {
            return {
              ...item,
              report: AbuseReport.createFromRawData(item.report)
            }
          })
        })
      );
  }

  read(report: AbuseReport)
  {
    return this.http.put<{ report: AbuseReport }>('/admin/abuse-report/read-report/' + report.id, {})
      .pipe(
      map((data) => {
        return AbuseReport.createFromRawData(data.report)
      })
    );
  }
}
