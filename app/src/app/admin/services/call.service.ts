import {BaseService} from "../../core/services/base.service";
import {Injectable} from "@angular/core";
import {CallListFilter} from "../data/model/call-list.filter";
import {HttpParams} from "@angular/common/http";
import {Call} from "../../client/data/model/calls/call.model";
import {map} from "rxjs/operators";

@Injectable()
export class CallService extends BaseService
{
  getList(filter: CallListFilter, page: number = 1)
  {

    const params: HttpParams = this.getHttpParamsFromObject({
      ...filter,
      endDate: filter.endDate.toUTCString(),
      startDate: filter.startDate.toUTCString(),
      page
    })

    return this.http.get<{ list: Call[], number: number }>('/admin/call/list', { params })
      .pipe(
        map(({ list, number }) => {

          return {
            calls: list.map(call => Call.createFromRawData(call)),
            number: number
          };

        })
      );
  }
}
