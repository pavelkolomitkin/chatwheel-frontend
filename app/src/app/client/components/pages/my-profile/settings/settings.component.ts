import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteAccountStart} from "../../../../data/actions";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('confirmationWindow') confirmationWindow: TemplateRef<any>;

  window: NgbModalRef = null;

  constructor(
    private store: Store<State>,
    private modal: NgbModal
  ) { }

  ngOnDestroy(): void {
        this.closeWindow();
    }

  ngOnInit(): void {

  }

  onDeleteConfirmClickHandler(event)
  {
    this.store.dispatch(new UserDeleteAccountStart());
  }

  onDeleteClickHandler(event)
  {
    this.openWindow();
  }

  openWindow()
  {
    this.window = this.modal.open(this.confirmationWindow, { centered: true });
    this
      .window
      .result
      .then(() => {})
      .catch(() => {});
  }

  closeWindow()
  {
    if (this.window !== null)
    {
      this.window.close();
      this.window = null;
    }
  }
}
