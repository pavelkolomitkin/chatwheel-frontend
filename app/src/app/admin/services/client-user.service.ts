import {Injectable} from "@angular/core";
import {AuthUserTypes} from "../data/model/auth-user-types.enum";
import {BaseService} from "../../core/services/base.service";
import {HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ClientUserListFilter} from "../data/model/client-user-list.filter";
import {User} from "../../security/data/models/user.model";
import {BlockUser} from "../data/model/block-user.model";

@Injectable()
export class ClientUserService extends BaseService
{
  getList(filter: ClientUserListFilter, page)
  {
    const params: HttpParams = this.getHttpParamsFromObject({
      ...filter,
      page,
      residenceCountry: filter.residenceCountry ? filter.residenceCountry.id : null,
      searchCountry: filter.searchCountry ? filter.searchCountry.id : null,
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

  getUser(id: string)
  {
    return this.http.get<{ user: User }>('/admin/client-user/user/' + id).pipe(
      map(({ user }) => {
        return User.createFromRawData(user);
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

  blockUser(user: User, data: BlockUser)
  {
    return this.http.put<{ user: User }>('/admin/client-user/block', {
      user: user.id,
      reason: data.reason
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
