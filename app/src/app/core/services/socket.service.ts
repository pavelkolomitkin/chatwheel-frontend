import {Socket} from 'ngx-socket-io';
import {environment} from '../../../environments/environment';

export class SocketService extends Socket
{
    constructor(namespace: string, authToken: string, options: any = {}) {

        const url: string = environment.baseSocketUrl + '/' + namespace;
        super({
            url,
            options: {
              ...options,
              query: 'token=' + authToken,
              transports: ['websocket'],
              secure: true,
            }
        });
    }

    release()
    {
        this.disconnect();
    }
}
