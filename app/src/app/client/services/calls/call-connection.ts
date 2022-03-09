import {CallService} from '../call.service';
import {CallSocketService} from '../sockets/call-socket.service';
import {UserMediaService} from '../../../core/services/user-media.service';
import * as Peer from 'simple-peer';
import {environment} from '../../../../environments/environment';
import {Subject} from 'rxjs';
import {Call} from '../../data/model/calls/call.model';
import {CallError} from './errors/call.error';
import {MediaError} from './errors/media.error';
import {CallConnectionInitiator} from './call-connection.initiator';


export class CallConnection
{
  static CONNECTION_ESTABLISHING_ERROR_MESSAGE = 'Cannot establish the connection with addressee!';
  static WEB_RTC_ISNT_SUPPORTED_ERROR_MESSAGE = 'Your browser does not support calls!';
  static MICROPHONE_AND_CAMERA_ISSUE_ERROR_MESSAGE = 'Check you microphone and video camera!';
  static CONNECTION_ESTABLISHING_TIMEOUT_ERROR = 'Connection timeout error!';

  protected localMediaSubject: Subject<MediaStream> = new Subject<MediaStream>();
  protected remoteMediaSubject: Subject<MediaStream> = new Subject<MediaStream>();
  protected errorSubject: Subject<Error> = new Subject<Error>();

  protected call: Call;

  protected userMediaStream: MediaStream = null;
  protected remoteMediaStream: MediaStream = null;

  protected peer: Peer;


  protected socketId: string;

  private _isInitialized: Boolean = false;
  private wasReleased: boolean = false;

  private establishingConnectionTimeout: number = 0;
  private establishingConnectionId: any = null;


  constructor(
    protected callService: CallService,
    protected callSockets: CallSocketService,
    protected userMediaService: UserMediaService
  ) {

  }

  /**
   * This function should overwritten in a subclass
   */
  async initialize()
  {

  }

  isInitialized()
  {
    return this._isInitialized;
  }

  async initiate()
  {
    // validate web rtc availability
    this.validateWebRTCAvailability();

    // init media - microphone and video
    // fire the event 'user_stream_ready' with the stream
    await this.initializeMedia();

    await this.initialize();

    this._isInitialized = true;

    this.initEstablishConnectionTimeout();
  }

  initEstablishConnectionTimeout()
  {
    if (this.establishingConnectionTimeout > 0)
    {
      this.establishingConnectionId = setTimeout(() => {

        this.errorSubject.next(new Error(CallConnection.CONNECTION_ESTABLISHING_TIMEOUT_ERROR));

        },
        this.establishingConnectionTimeout
      );
    }
  }

  releaseEstablishConnectionTimeout()
  {
    if (!!this.establishingConnectionId)
    {
      clearTimeout(this.establishingConnectionId);
      this.establishingConnectionId = null;
    }
  }

  async hangUp()
  {
    const call: Call = this.getCall();

    if (call)
    {
      await this.callService.hangUp(call).toPromise();
    }
  }

  async reject()
  {
    const call: Call = this.getCall();
    if (call)
    {
      await this.callService.reject(call).toPromise();
    }
  }

  async release(preserveLocalMedia: boolean = false)
  {
    this.wasReleased = true;
    this.localMediaSubject.unsubscribe();
    this.remoteMediaSubject.unsubscribe();
    this.errorSubject.unsubscribe();
    this.releaseEstablishConnectionTimeout();

    if (!preserveLocalMedia)
    {
      await this.releaseMediaStream(this.userMediaStream);
    }

    this.userMediaStream = null;

    await this.releaseMediaStream(this.remoteMediaStream);
    this.remoteMediaStream = null;

    if (this.peer)
    {
      this.peer.destroy();
    }
  }

  async releaseMediaStream(stream: MediaStream)
  {
    if (stream)
    {
      stream.getTracks().forEach(track => track.stop());
    }
  }

  getCall()
  {
    return this.call;
  }

  setEstablishingConnectionTimeout(milliseconds: number = 0)
  {
    this.establishingConnectionTimeout = milliseconds;
    return this;
  }

  setSocketId(id: string)
  {
    this.socketId = id;
    return this;
  }

  setUserMedia(media: MediaStream)
  {
    this.userMediaStream = media;
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
    if (!!this.userMediaStream)
    {
      this.localMediaSubject.next(this.userMediaStream);
      return;
    }

    try {
      // @ts-ignore
      this.userMediaStream = await this.userMediaService.getUserMedia(true, true);

      if (this.wasReleased)
      {
        await this.releaseMediaStream(this.userMediaStream);
        this.userMediaStream = null;

        return;
      }

      this.localMediaSubject.next(this.userMediaStream);
    }
    catch (error)
    {
      this.releaseEstablishConnectionTimeout();

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
    this.peer.on('stream', async (stream: MediaStream) => {

      this.releaseEstablishConnectionTimeout();

      if (this.wasReleased)
      {
        await this.releaseMediaStream(stream);
        return;
      }


      this.remoteMediaStream = stream;
      this.remoteMediaSubject.next(this.remoteMediaStream);
    });
  }

  initPeerErrorHandler()
  {
    this.peer.on('error', (error) => {
      this.releaseEstablishConnectionTimeout();
      this.errorSubject.next(new CallError(CallConnectionInitiator.CONNECTION_ESTABLISHING_ERROR_MESSAGE));
    });
  }

  getPeerOptions(stream: MediaStream, params: Object)
  {
    const result = {
      ...params,
      stream: stream,
      trickle: false,
      config: {iceServers: environment.iceServers}
    };

    return result;
  }
}
