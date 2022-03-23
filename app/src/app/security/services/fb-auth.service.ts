import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class FbAuthService
{
  constructor(private httpClient: HttpClient) {}

  auth(accessToken: string, code: string)
  {
    return this.httpClient.post<{ token: string }>('/security/fb/auth', {
      accessToken,
      code
    }).pipe(
      map(result => result.token)
    );
  }
}
