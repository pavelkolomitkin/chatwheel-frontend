import {Injectable} from "@angular/core";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {User} from "../data/models/user.model";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class ProfileService extends BaseService
{
  constructor(private httpClient: HttpClient) {
    super()
  }

  getProfile(): Observable<User>
  {
    return this.httpClient.get<{ user: User }>('/security/profile')
      .pipe(
        map(result => User.createFromRawData(result.user))
      );
  }
}
