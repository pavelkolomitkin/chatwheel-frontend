import {BaseService} from "./base.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoginCredentials} from "../data/models/login-credentials.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RegisterData} from "../data/models/register-data.model";
import {RestorePasswordData} from "../data/models/restore-password-data.model";

@Injectable()
export class SecurityService extends BaseService
{
  constructor(private httpClient: HttpClient) {
    super()
  }

  register(data: RegisterData): Observable<void>
  {
    return this.httpClient.post<void>('/security/login/register', {...data});
  }

  registerConfirm(key: string): Observable<string>
  {
    return this.httpClient
      .put<{ token: string }>('/security/login/register-confirm', { key })
      .pipe(
        map(result => result.token)
      );
  }

  login(credential: LoginCredentials): Observable<string>
  {
    return this.httpClient.post<{token: string}>(
      '/security/login/login',
      {...credential}
    )
      .pipe(map(result => result.token));
  }

  passwordRestoreRequest(email: string): Observable<{secondsLeft: number}>
  {
    return this.httpClient.post<{secondsLeft: number}>('/security/login/restore-password-request', { email });
  }

  restorePasswordKeyVerify(key: string)
  {
    return this.httpClient.get('/security/login/restore-password-key-check/' + key);
  }

  restorePassword(data: RestorePasswordData)
  {
    return this.httpClient.put('/security/login/restore-password', { ...data });
  }
}
