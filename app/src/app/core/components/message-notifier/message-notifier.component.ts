import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {filter} from "rxjs/operators";
import {Notification, NotificationType} from "../../data/models/notification.model";
import {TranslateService} from "@ngx-translate/core";

declare var $: any;

@Component({
  selector: 'app-message-notifier',
  templateUrl: './message-notifier.component.html',
  styleUrls: ['./message-notifier.component.css']
})
export class MessageNotifierComponent implements OnInit {

  messageConfigs = {
    [ NotificationType.SUCCESS ]: {
      showHideTransition: 'slide',
      icon: 'success',
      loaderBg: '#f96868',
      position: 'top-right'
    },
    [ NotificationType.INFO ]: {
      showHideTransition: 'slide',
      icon: 'info',
      loaderBg: '#46c35f',
      position: 'top-right'
    },
    [ NotificationType.WARNING ]: {
      showHideTransition: 'slide',
      icon: 'warning',
      loaderBg: '#57c7d4',
      position: 'top-right'
    },
    [ NotificationType.ERROR ]: {
      showHideTransition: 'slide',
      icon: 'error',
      loaderBg: '#f2a654',
      position: 'top-right'
    }

  };

  constructor(
    private store: Store<State>,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(state => state.core.lastNotification),
      filter(notification => !!notification)
    ).subscribe(async (notification: Notification) => {
      await this.showNotification(notification);
    });
  }

  async showNotification(notification: Notification)
  {
    const message: string = !!notification.message ? await this.translate.get(notification.message).toPromise() : notification.message;
    const head: string = !!notification.title ? await this.translate.get(notification.title).toPromise() : notification.title;


    const config =
      {
        ...this.messageConfigs[notification.type],
        text: message,
        heading: head
      }
    ;

    $.toast(config);
  }
}
