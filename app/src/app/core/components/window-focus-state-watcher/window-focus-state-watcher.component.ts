import {Component, HostListener, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../app.state";
import {GlobalWindowFocusChange} from "../../data/actions";

@Component({
  selector: 'app-window-focus-state-watcher',
  templateUrl: './window-focus-state-watcher.component.html',
  styleUrls: ['./window-focus-state-watcher.component.css']
})
export class WindowFocusStateWatcherComponent implements OnInit {

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    document.body.focus();

    const isWindowFocused: boolean = document.hasFocus();
    this.store.dispatch(new GlobalWindowFocusChange(isWindowFocused));
  }


  @HostListener('window:focus', ['$event'])
  onWindowFocusHandler(event: FocusEvent)
  {
    this.store.dispatch(new GlobalWindowFocusChange(true));
  }

  @HostListener('window:blur', ['$event'])
  onWindowBlurHandler(event: FocusEvent)
  {
    this.store.dispatch(new GlobalWindowFocusChange(false));
  }
}
