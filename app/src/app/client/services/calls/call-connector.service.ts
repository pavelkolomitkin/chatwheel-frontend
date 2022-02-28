import {EventEmitter, Injectable} from "@angular/core";
import {CallService} from "../call.service";
import {State} from "../../../app.state";
import {User} from "../../../security/data/models/user.model";
import {Call} from "../../data/model/calls/call.model";
import {first} from "rxjs/operators";
import {CallConnection} from "./call-connection";
import {CallConnectionInitiator} from "./call-connection.initiator";
import {CallSocketService} from "../sockets/call-socket.service";
import {UserMediaService} from "../../../core/services/user-media.service";
import {CallConnectionReceiver} from "./call-connection.receiver";

@Injectable()
export class CallConnectorService
{
  constructor(
    private readonly callService: CallService,
    private readonly callSockets: CallSocketService,
    private readonly userMediaService: UserMediaService
  ) {

  }

  call(addressee: User, socketId: string, isDirect: boolean = true): CallConnection
  {
    const connection: CallConnectionInitiator = new CallConnectionInitiator(
      this.callService,
      this.callSockets,
      this.userMediaService
    );

    connection
      .setAddressee(addressee)
      .setIsDirect(isDirect)
      .setSocketId(socketId);

    return connection;
  }

  receive(call: Call, socketId: string): CallConnection
  {
    const connection: CallConnectionReceiver = new CallConnectionReceiver(
      this.callService,
      this.callSockets,
      this.userMediaService
    );

    connection
      .setCall(call)
      .setSocketId(socketId);

    return connection;
  }

}
