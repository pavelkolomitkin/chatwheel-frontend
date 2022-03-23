import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-window-title-notifier',
  templateUrl: './window-title-notifier.component.html',
  styleUrls: ['./window-title-notifier.component.css']
})
export class WindowTitleNotifierComponent implements OnInit, OnDestroy {

  static FLASH_INTERVAL_MILLISECONDS = 1000;

  windowTitleChangeSubscription: Subscription;
  titleFlashInterval: any = null;

  flashingMessage: string = null;
  defaultMessage: string;

  constructor(
    private store: Store<State>,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.defaultMessage = this.title.getTitle();
    //debugger

    this.windowTitleChangeSubscription = this
      .store
      .pipe(select(state => state.core.windowTitleFlashMessage))
      .subscribe(this.onWindowTitleMessageChange);

  }

  ngOnDestroy(): void {

    this.windowTitleChangeSubscription.unsubscribe();
    this.clearFlashInterval();
  }

  onWindowTitleMessageChange = (message: string) => {

    this.flashingMessage = message;

    this.updateInterval();
  }

  clearFlashInterval()
  {
    if (!!this.titleFlashInterval)
    {
      clearInterval(this.titleFlashInterval);
      this.titleFlashInterval = null;
    }
  }

  updateInterval()
  {
    this.clearFlashInterval();

    if (!this.flashingMessage)
    {
      this.title.setTitle(this.defaultMessage);
      return;
    }

    this.titleFlashInterval = setInterval(() => {

      const currentTitle: string = this.title.getTitle();
      //debugger

      const newTitle: string = (currentTitle === this.defaultMessage) ? this.flashingMessage : this.defaultMessage;
      this.title.setTitle(newTitle);

    }, WindowTitleNotifierComponent.FLASH_INTERVAL_MILLISECONDS);
  }
}
