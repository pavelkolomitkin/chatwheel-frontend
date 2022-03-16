import {BaseService} from "../../core/services/base.service";
import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {User} from "../../security/data/models/user.model";
import {map} from "rxjs/operators";
import {CreateAdminUser} from "../data/model/create-admin-user.model";
import {EditAdminUser} from "../data/model/edit-admin-user.model";
import {ResetPasswordAdminUser} from "../data/model/reset-password-admin-user.model";

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


  getList(page: number = 1)
  {
    const params: HttpParams = this.getHttpParamsFromObject({ page });

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
