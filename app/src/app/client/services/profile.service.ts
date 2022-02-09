import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../../security/data/models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class ProfileService
{
  constructor(
    private readonly http: HttpClient
  ) {
  }

  updateFullName(name: string): Observable<User>
  {
    return this.http.put<{ user: User }>('/client/profile/fullname', { fullName: name })
      .pipe(
        map(data => User.createFromRawData(data.user))
      );
  }
}
