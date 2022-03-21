import {BaseSocketService} from "../../../core/services/base-socket.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AdminUserStateSocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'admin-user-state';
  }

  getMyAccountBlocked()
  {
    return this.fromEvent('i_have_been_blocked');
  }

  getMyAccountDeleted()
  {
    return this.fromEvent('i_have_been_deleted');
  }
}
