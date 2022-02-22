import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {AbuseReportType} from '../data/models/abuse-report-type.model';
import {map} from 'rxjs/operators';

@Injectable()
export class AbuseReportTypeService extends BaseService
{
  getList()
  {
    return this.http.get<{ list: AbuseReportType[] }>('/core/abuse-report-type/list').pipe(
      map(({ list }) => {
        return list;
      })
    );
  }
}
