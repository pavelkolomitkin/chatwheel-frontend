import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class VkAuthService
{
  constructor(private httpClient: HttpClient) {}

  auth(accessToken: string, userId: string)
  {
    return this.httpClient.post<{ token: string }>('/security/vk/auth', {
      accessToken,
      userId
    }).pipe(
      map(result => result.token)
    );
  }
}
