import {BaseService} from "../../../core/services/base.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";


@Injectable()
export class ClientUserStatisticsService extends BaseService
{
  getNumber(): Observable<{ total: number, emailNumber: number, vkNumber: number }>
  {
    return this.http.get<{ total: number, emailNumber: number, vkNumber: number }>('/admin/client-user-statistics/number')
      .pipe(map(({ total, emailNumber, vkNumber }) => {
        return {
          total,
          emailNumber,
          vkNumber
        }
      }));
  }

  getMonthsStatistics(startMonth: Date, endMonth: Date)
  {
    const data = {
      startMonth: startMonth.toISOString().split('T')[0],
      endMonth: endMonth.toISOString().split('T')[0],
    }

    const params: HttpParams = this.getHttpParamsFromObject(data);

    return this.http.get<{ statistics: { all: any[], email: any[], vk: any[] } }>('/admin/client-user-statistics/months', { params })
      .pipe(
        map(data => data.statistics)
      );
  }
}
