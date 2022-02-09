import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {filter} from "rxjs/operators";
import {Notification, NotificationType} from "../../data/models/notification.model";

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
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(state => state.core.lastNotification),
      filter(notification => !!notification)
    ).subscribe((notification: Notification) => {
      this.showNotification(notification);
    });
  }

  showNotification(notification: Notification)
  {
    const config =
      {
        ...this.messageConfigs[notification.type],
        text: notification.message,
        heading: notification.title
      }
    ;

    $.toast(config);
  }
}
