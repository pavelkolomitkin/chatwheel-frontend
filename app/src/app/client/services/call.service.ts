import {Injectable} from "@angular/core";
import {BaseService} from "../../core/services/base.service";
import {User} from "../../security/data/models/user.model";
import {map} from "rxjs/operators";
import {Call} from "../data/model/calls/call.model";
import {CallMember} from "../data/model/calls/call-member.model";
import {CallMemberLink} from "../data/model/calls/call-member-link.model";

@Injectable()
export class CallService extends BaseService
{
  initiate(addressee: User, isDirect: boolean, windowId: string)
  {
    return this.http.post<{ call: Call, members: CallMember[] }>('/client/calls/initiate', {
      addresseeId: addressee.id,
      isDirect: isDirect,
      socketId: windowId
    }).pipe(
      map((data) => {
        return Call.createFromRawData(data);
      })
    );
  }

  answer(call: Call, peerId: string, windowId: string)
  {
    return this.http.put('/client/calls/answer', {
      callId: call.id,
      peerId: peerId,
      socketId: windowId
    });
  }

  connect(link: CallMemberLink)
  {
    return this.http.put('/client/calls/connect', {
      linkId: link.id,
      peerId: link.addresseePeer
    });
  }

  reject(call: Call)
  {
    return this.http.put('/client/calls/reject/' + call.id, {});
  }

  hangUp(call: Call)
  {
    return this.http.put('/client/calls/hang-up/' + call.id, {});
  }
}
