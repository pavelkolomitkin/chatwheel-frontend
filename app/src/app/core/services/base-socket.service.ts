import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {SocketService} from './socket.service';
import {State} from "../../app.state";

@Injectable()
export class BaseSocketService
{
    private unProcessedEmits: {} = {};

    private tokenSubscription: Subscription;

    public socket: SocketService;

    private socketReadySubject: Subject<any> = new Subject<any>();

    constructor(public store: Store<State>) {

        this.tokenSubscription = this.store.pipe(select(state => state.security.token)).subscribe(
            (token: string) => {

              if (token === null)
              {
                this.release();
                return;
              }

                this.socket = new SocketService(this.getNamespace(), token, this.getConnectionOptions());

                this.flushEventSubscribers();
                this.flushUnprocessedEmits();
            });
    }

    flushUnprocessedEmits()
    {
        for (const event of Object.keys(this.unProcessedEmits))
        {
            const data = this.unProcessedEmits[event];
            this.socket.emit(event, data);
        }
    }

    flushEventSubscribers()
    {
      this.socketReadySubject.next();
    }

    getNamespace(): string
    {
        throw new Error('You should override this method at the subclass!');
    }

    getConnectionOptions(): any
    {
        return {};
    }

    release()
    {
        if (this.socket)
        {
            this.socket.release();
            this.socket = null;
        }
        //this.tokenSubscription.unsubscribe();
    }


    fromEvent(event: string): Observable<any>
    {
      return new Observable<any>((subscriber) => {

        if (!this.socket)
        {
          this.socketReadySubject.subscribe((observer) => {

            this.socket.fromEvent(event).subscribe((data: any) => {
              subscriber.next(data);
            });
          });

          return;
        }

        this.socket.fromEvent(event).subscribe((data: any) => {
          subscriber.next(data);
        });

      });
    }

    emit(event: string, data: any)
    {
        if (this.socket)
        {
            this.socket.emit(event, data);
        }
        else {
            this.unProcessedEmits[event] = data;
        }
    }

}
