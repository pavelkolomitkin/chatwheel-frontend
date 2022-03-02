import {CallConnection} from './call-connection';
import {CallMemberLink} from '../../data/model/calls/call-member-link.model';
import {Subscription} from "rxjs";
import {CallError} from "./errors/call.error";
import {User} from "../../../security/data/models/user.model";

export class CallConnectionInitiator extends CallConnection
{
  memberConnectingSubscription: Subscription = null;

  protected addressee: User;
  protected isDirect: boolean;

  setAddressee(addressee: User)
  {
    this.addressee = addressee;
    return this;
  }

  setIsDirect(isDirect: boolean)
  {
    this.isDirect = isDirect;
    return this;
  }

  async initiate() {
    await super.initiate();

    // initiate a call on the server calling callService
    this.call = await this.callService.initiate(this.addressee, this.isDirect, this.socketId).toPromise();

    // listen to the socket 'call_user_connecting' event
    this.memberConnectingSubscription = this.callSockets.getConnectingMember().subscribe(this.onMemberConnectingHandler);
  }

  onMemberConnectingHandler = (link: CallMemberLink) => {

    if (link.call !== this.call.id)
    {
      return;
    }

    // create a peer(initiator = false)
    try {
      this.peer = this.createCalleePeer(this.userMediaStream);
    }
    catch (error)
    {
      this.errorSubject.next(new CallError(CallConnectionInitiator.CONNECTION_ESTABLISHING_ERROR_MESSAGE));
      return;
    }

    this.initPeerStreamHandler();
    this.initPeerErrorHandler();

    this.peer.on('signal', async (data) => {

      link.addresseePeer = JSON.stringify(data)

      try {
        // connect to the connecting member
        //debugger
        await this.callService.connect(link).toPromise();
      }
      catch (error)
      {
        //debugger
        this.errorSubject.next(new CallError(CallConnectionInitiator.CONNECTION_ESTABLISHING_ERROR_MESSAGE));
      }
    });

    const initiatorPeer: any = JSON.parse(link.initiatorPeer);
    this.peer.signal(initiatorPeer);
  }

  async release()
  {
    await super.release();

    if (this.memberConnectingSubscription !== null)
    {
      this.memberConnectingSubscription.unsubscribe();
      this.memberConnectingSubscription = null;
    }
  }
}
