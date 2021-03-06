import {CallConnection} from './call-connection';
import {CallError} from './errors/call.error';
import {Subscription} from 'rxjs';
import {CallMemberLink} from '../../data/model/calls/call-member-link.model';
import {Call} from "../../data/model/calls/call.model";

export class CallConnectionReceiver extends CallConnection
{
  connectedMemberSubscription: Subscription = null;

  setCall(call: Call)
  {
    this.call = call;
    return this;
  }


  async initialize(): Promise<void> {

    try {
      this.peer = this.createInitiatorPeer(this.userMediaStream);
    }
    catch (error)
    {
      throw new CallError(CallConnectionReceiver.CONNECTION_ESTABLISHING_ERROR_MESSAGE);
    }

    this.connectedMemberSubscription = this.callSockets.getConnectedMember().subscribe(this.connectedMemberHandler);

    this.peer.on('signal', async (data) => {

      const peerId: string = JSON.stringify(data);

      try {
        await this.callService.answer(this.call, peerId, this.socketId).toPromise();
      }
      catch (error)
      {
        this.errorSubject.next(new CallError(CallConnectionReceiver.CONNECTION_ESTABLISHING_ERROR_MESSAGE));
      }
    });

    this.initPeerStreamHandler();
    this.initPeerErrorHandler();
  }

  connectedMemberHandler = (link: CallMemberLink) => {

    if (link.call !== this.call.id)
    {
      return;
    }

    const peerId: any = JSON.parse(link.addresseePeer);
    this.peer.signal(peerId);
  }

  async release(preserveLocalMedia: boolean = false): Promise<void> {
    await super.release(preserveLocalMedia);

    if (this.connectedMemberSubscription !== null)
    {
      this.connectedMemberSubscription.unsubscribe();
      this.connectedMemberSubscription = null;
    }

  }

}
