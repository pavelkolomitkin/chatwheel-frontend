import {Injectable} from "@angular/core";
import {AuthUserTypes} from "../data/model/auth-user-types.enum";
import {BaseService} from "../../core/services/base.service";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ClientUserListFilter} from "../data/model/client-user-list.filter";
import {User} from "../../security/data/models/user.model";

@Injectable()
export class ClientUserService extends BaseService
{
  getList(filter: ClientUserListFilter, page)
  {
    const params: HttpParams = this.getHttpParamsFromObject({
      ...filter,
      page
    });

    return this.http.get<{users: User[], totalNumber: number}>('/admin/client-user/list', { params }).pipe(
      map(({ users, totalNumber }) => {
        return {
          users: users.map(user => User.createFromRawData(user)),
          totalNumber: totalNumber
        }
      })
    );
  }

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

  blockUser(user: User, reason: string = null)
  {
    return this.http.put<{ user: User }>('/admin/client-user/block', {
      user: user.id,
      reason: reason
    }).pipe(
      map(({ user }) => {
        return User.createFromRawData(user);
      })
    );
  }

  unBlockUser(user: User)
  {
    return this.http.put<{ user: User }>('/admin/client-user/unblock', {
      user: user.id,
    }).pipe(
      map(({ user }) => {
        return User.createFromRawData(user);
      })
    );
  }

  deleteUser(user: User)
  {
    return this.http.delete<{ user: User }>('/admin/client-user/delete/' + user.id).pipe(
      map(({ user }) => {
        return User.createFromRawData(user);
      })
    );
  }
}
