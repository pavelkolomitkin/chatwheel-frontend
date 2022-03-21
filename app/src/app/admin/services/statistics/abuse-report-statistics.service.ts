import {Injectable} from '@angular/core';
import {BaseService} from '../../../core/services/base.service';
import {map} from 'rxjs/operators';
import {AbuseReportTypeStatistic} from "../../data/model/statistics/abuse-report-type-statistic.model";
import {HttpParams} from "@angular/common/http";

@Injectable()
export class AbuseReportStatisticsService extends BaseService
{
  getTotalNumbers()
  {
    return this.http.get<{totalNumber: number, newNumber: number}>('/admin/abuse-report-statistics/numbers').pipe(
      map(({  totalNumber, newNumber }) => {
        return {  totalNumber, newNumber };
      })
    )
  }

  getTypeNumbers()
  {
    return this.http.get<{ statistics: AbuseReportTypeStatistic[] }>('/admin/abuse-report-statistics/type-numbers').pipe(
      map(({ statistics }) => {
        return statistics
      })
    );
  }

  getMonthStatistics(startMonth: Date, endMonth: Date)
  {
    const data = {
      startMonth: startMonth.toISOString().split('T')[0],
      endMonth: endMonth.toISOString().split('T')[0],
    }

    const params: HttpParams = this.getHttpParamsFromObject(data);

    return this.http.get<{ statistics: any }>('/admin/abuse-report-statistics/months', { params })
      .pipe(
        map(data => data.statistics)
      );
  }
}
