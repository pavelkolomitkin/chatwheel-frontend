import {Injectable} from "@angular/core";
import {BaseSocketService} from "../../../core/services/base-socket.service";
import {map} from "rxjs/operators";
import {Call} from "../../data/model/calls/call.model";
import {CallMemberLink} from "../../data/model/calls/call-member-link.model";

@Injectable()
export class CallSocketService extends BaseSocketService
{
  getNamespace(): string {
    return 'calls';
  }

  getCallConnectionId()
  {
    return this.fromEvent('call_client_connected')
      .pipe(
        map(data => data.id)
      );
  }

  getIncomingCall()
  {
    return this.fromEvent('call_incoming_call')
      .pipe(
        map(data => {
          return Call.createFromRawData(data);
        })
      );
  }

  getConnectingMember()
  {
    return this.fromEvent('call_member_is_connecting')
      .pipe(
        map((data) => {
          return CallMemberLink.createFromRawData(data);
        })
      );
  }

  getConnectedMember()
  {
    return this.fromEvent('call_member_connected')
      .pipe(
        map((data) => {
          return CallMemberLink.createFromRawData(data);
        })
      );
  }

  getRejectedMember()
  {
    return this.fromEvent('call_member_reject')
      .pipe(
        map((data) => {
          return CallMemberLink.createFromRawData(data);
        })
      );
  }

  getHungUpMember()
  {
    return this.fromEvent('call_member_hung_up')
      .pipe(
        map((data) => {
          return CallMemberLink.createFromRawData(data);
        })
      );
  }
}
