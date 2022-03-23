import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {Subscription} from "rxjs";
import {GlobalSetWindowTitleMessage} from "../../../../core/data/actions";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-flash-message-notifier',
  templateUrl: './flash-message-notifier.component.html',
  styleUrls: ['./flash-message-notifier.component.css']
})
export class FlashMessageNotifierComponent implements OnInit, OnDestroy {

  isWindowFocused: boolean;

  newMessageNumber: number = 0;
  newIncomingCallNumber: number = 0;

  windowFocusSubscription: Subscription;
  newMessageNumberSubscription: Subscription;
  incomingCallChangeSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.windowFocusSubscription = this
      .store
      .pipe(select(state => state.core.isWindowFocused))
      .subscribe(async (isWindowFocused: boolean) => {

        this.isWindowFocused = isWindowFocused;
        if (!this.isWindowFocused)
        {
          this.newMessageNumber = 0;
          this.newIncomingCallNumber = 0;
        }

        await this.updateFlashMessage();
      });

    this.newMessageNumberSubscription = this
      .store
      .pipe(select(state => state.client.newMessageNumber))
      .subscribe(this.newMessageNumberChangeHandler);


    this.incomingCallChangeSubscription = this
      .store
      .pipe(select(state => state.calls.incomingCallNumber))
      .subscribe(this.incomingCallChangeHandler);

  }

  ngOnDestroy(): void {

    this.windowFocusSubscription.unsubscribe();
    this.newMessageNumberSubscription.unsubscribe();
    this.incomingCallChangeSubscription.unsubscribe();

  }

  newMessageNumberChangeHandler = async (messageNumber: number) => {

    this.newMessageNumber = messageNumber;
    await this.updateFlashMessage();
  }

  incomingCallChangeHandler = async (newNumber: number) => {

    this.newIncomingCallNumber = newNumber;
    await this.updateFlashMessage();
  }

  async updateFlashMessage()
  {
    let message: string = null;

    if (!this.isWindowFocused)
    {
      if (this.newIncomingCallNumber > 0)
      {
        message = await this.translate.get('CALLING').toPromise() + '...';
      }
      else if (this.newMessageNumber > 0)
      {
        message = this.newMessageNumber + ' ' + await this.translate.get('MESSAGE(S)').toPromise();
      }
    }

//    debugger
    this.store.dispatch(new GlobalSetWindowTitleMessage(message));
  }

}
