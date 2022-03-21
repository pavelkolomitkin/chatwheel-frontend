import {BaseService} from "../../../core/services/base.service";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class CallStatisticsService extends BaseService
{
  getNumbers()
  {
    return this
      .http
      .get<{ total: number, chatWheelNumber: number, directCallNumber: number }>('/admin/call-statistics/numbers');
  }

  getMonthStatistics(startMonth: Date, endMonth: Date)
  {
    const data = {
      startMonth: startMonth.toISOString().split('T')[0],
      endMonth: endMonth.toISOString().split('T')[0],
    }

    const params: HttpParams = this.getHttpParamsFromObject(data);

    return this
      .http
      .get<{ all: any, chatWheel: any, directCalls: any }>('/admin/call-statistics/months', { params });
  }
}
