import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../security/data/models/user.model";
import {map} from "rxjs/operators";

@Injectable()
export class UserProfileService
{
  constructor(
    private readonly http: HttpClient
  ) {
  }

  get(id: string)
  {
    return this.http.get<{ user: User }>('/client/user-profile/' + id)
      .pipe(
        map(data => User.createFromRawData(data.user))
      )
      ;
  }
}
