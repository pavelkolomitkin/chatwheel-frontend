import {BaseService} from "../../core/services/base.service";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {User} from "../../security/data/models/user.model";
import {map} from "rxjs/operators";
import {CreateAdminUser} from "../data/model/create-admin-user.model";
import {EditAdminUser} from "../data/model/edit-admin-user.model";
import {ResetPasswordAdminUser} from "../data/model/reset-password-admin-user.model";
import {BlockUser} from "../data/model/block-user.model";
import {AdminUserListFilter} from "../data/model/admin-user-list.filter";

@Injectable()
export class AdminUserService  extends BaseService
{

  getNumber()
  {
    return this.http.get<{ number: number }>('/admin/admin-user/number')
      .pipe(
        map(data => data.number)
      );
  }


  getList(filter: AdminUserListFilter, page: number = 1)
  {
    const params: HttpParams = this.getHttpParamsFromObject({
      ...filter,
      page
    });

    return this.http.get<{ list: User[], totalNumber: number }>('/admin/admin-user/list', { params })
      .pipe(
        map((data) => {
          return {
            totalNumber: data.totalNumber,
            list: data.list.map(item => User.createFromRawData(item))
          }
        })
      );
  }

  create(data: CreateAdminUser)
  {
    return this.http.post<{admin: User}>('/admin/admin-user', {
      ...data
    })
      .pipe(
        map(({admin}) => {
          return User.createFromRawData(admin);
        })
      );
  }

  edit(admin: User, data: EditAdminUser)
  {
    data.id = admin.id;

    return this.http.put<{admin: User}>('/admin/admin-user/edit/' + admin.id, {
      ...data
    })
      .pipe(
        map(({admin}) => {
          return User.createFromRawData(admin);
        })
      );
  }

  resetPassword(admin: User, data: ResetPasswordAdminUser)
  {
    return this.http.put<{admin: User}>('/admin/admin-user/reset-password/' + admin.id, {
      ...data
    })
      .pipe(
        map(({admin}) => {
          return User.createFromRawData(admin);
        })
      );
  }

  block(admin: User, data: BlockUser)
  {
    return this.http.put<{admin: User}>('/admin/admin-user/block/' + admin.id, {
      reason: data.reason
    })
      .pipe(
        map(({admin}) => {
          return User.createFromRawData(admin);
        })
      );
  }

  unBlock(admin: User)
  {
    return this.http.put<{admin: User}>('/admin/admin-user/un-block/' + admin.id, {})
      .pipe(
        map(({admin}) => {
          return User.createFromRawData(admin);
        })
      );
  }

  delete(admin: User)
  {
    return this.http.delete<{admin: User}>('/admin/admin-user/' + admin.id)
      .pipe(
        map(({admin}) => {
          return User.createFromRawData(admin);
        })
      );
  }
}
