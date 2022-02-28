import {CallService} from "../call.service";
import {CallSocketService} from "../sockets/call-socket.service";
import {UserMediaService} from "../../../core/services/user-media.service";
import * as Peer from 'simple-peer';
import {environment} from "../../../../environments/environment";
import {Subject} from "rxjs";
import {Call} from "../../data/model/calls/call.model";
import {User} from "../../../security/data/models/user.model";
import {CallError} from "./errors/call.error";
import {MediaError} from "./errors/media.error";
import {CallConnectionInitiator} from "./call-connection.initiator";


export class CallConnection
{
  static CONNECTION_ESTABLISHING_ERROR_MESSAGE = 'Cannot establish the connection with addressee!';
  static WEB_RTC_ISNT_SUPPORTED_ERROR_MESSAGE = 'Your browser does not support calls!';
  static MICROPHONE_AND_CAMERA_ISSUE_ERROR_MESSAGE = 'Check you microphone and video camera!';

  protected localMediaSubject: Subject<MediaStream> = new Subject<MediaStream>();
  protected remoteMediaSubject: Subject<MediaStream> = new Subject<MediaStream>();
  protected errorSubject: Subject<Error> = new Subject<Error>();

  protected call: Call;

  protected userMediaStream: MediaStream = null;
  protected remoteMediaStream: MediaStream = null;

  protected peer: Peer;


  protected socketId: string;


  constructor(
    protected callService: CallService,
    protected callSockets: CallSocketService,
    protected userMediaService: UserMediaService
  ) {

  }

  async initiate()
  {
    // validate web rtc availability
    this.validateWebRTCAvailability();

    // init media - microphone and video
    // fire the event 'user_stream_ready' with the stream
    await this.initializeMedia();

  }

  async release()
  {
    this.localMediaSubject.unsubscribe();
    this.remoteMediaSubject.unsubscribe();
    this.errorSubject.unsubscribe();

    if (this.peer)
    {
      this.peer.destroy();
    }

    this.releaseMediaStream(this.userMediaStream);
    this.userMediaStream = null;

    this.releaseMediaStream(this.remoteMediaStream);
    this.remoteMediaStream = null;
  }

  releaseMediaStream(stream: MediaStream)
  {
    if (stream)
    {
      stream.getTracks().forEach(track => track.stop());
    }
  }


  setSocketId(id: string)
  {
    this.socketId = id;
    return this;
  }

  getLocalMediaStream()
  {
    return this.localMediaSubject;
  }

  getRemoteMediaStream()
  {
    return this.remoteMediaSubject;
  }

  getErrors()
  {
    return this.errorSubject;
  }

  validateWebRTCAvailability()
  {
    if (!Peer.WEBRTC_SUPPORT)
    {
      throw new CallError(CallConnection.WEB_RTC_ISNT_SUPPORTED_ERROR_MESSAGE);
    }
  }

  async initializeMedia()
  {
    try {
      // @ts-ignore
      this.userMediaStream = await this.userMediaService.getUserMedia(true, true);
      this.localMediaSubject.next(this.userMediaStream);
    }
    catch (error)
    {
      throw new MediaError(CallConnection.MICROPHONE_AND_CAMERA_ISSUE_ERROR_MESSAGE);
    }

  }


  createInitiatorPeer(stream: MediaStream, options: {} = {})
  {
    const params = this.getPeerOptions(stream, {...options, initiator: true});

    return new Peer(params);
  }

  createCalleePeer(stream: MediaStream, options: {} = {})
  {
    const params = this.getPeerOptions(stream, {...options, initiator: false});

    return new Peer(params);
  }

  initPeerStreamHandler()
  {
    this.peer.on('stream', (stream: MediaStream) => {
      this.remoteMediaStream = stream;
      this.remoteMediaSubject.next(this.remoteMediaStream);
    });
  }

  initPeerErrorHandler()
  {
    this.peer.on('error', (error) => {
      this.errorSubject.next(new CallError(CallConnectionInitiator.CONNECTION_ESTABLISHING_ERROR_MESSAGE));
    });
  }

  getPeerOptions(stream: MediaStream, params: Object)
  {
    // TODO add stun and turn servers to the configuration
    const result = {
      ...params,
      stream: stream,
      trickle: false,
      config: {iceServers: environment.iceServers}
    };

    return result;
  }
}
