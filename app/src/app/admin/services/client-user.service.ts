import {Injectable} from "@angular/core";
import {AuthUserTypes} from "../data/model/user-types.enum";
import {BaseService} from "../../core/services/base.service";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class ClientUserService extends BaseService
{
  getNumber(authType: AuthUserTypes = null): Observable<number>
  {
    const data = {};

    if (authType !== null)
    {
      // @ts-ignore
      data.type = authType
    }

    const params: HttpParams = this.getHttpParamsFromObject(data);

    return this.http.get<{ number: number }>('/admin/client-user/number', { params }).pipe(
      map(data => data.number)
    );
  }
}
