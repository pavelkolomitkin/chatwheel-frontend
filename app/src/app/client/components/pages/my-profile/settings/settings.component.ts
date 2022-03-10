import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {UserDeleteAccountStart} from "../../../../data/actions";
import {Observable} from "rxjs";
import {User} from "../../../../../security/data/models/user.model";
import {UserLogout} from "../../../../../security/data/actions";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  @ViewChild('confirmationWindow') confirmationWindow: TemplateRef<any>;

  window: NgbModalRef = null;

  user: Observable<User>;

  constructor(
    private store: Store<State>,
    private modal: NgbModal
  ) { }

  ngOnDestroy(): void {
        this.closeWindow();
    }

  async ngOnInit() {
    this.user = this.store.pipe(select(state => state.security.user));
  }

  onDeleteConfirmClickHandler(event)
  {
    this.store.dispatch(new UserDeleteAccountStart());
  }

  onDeleteClickHandler(event)
  {
    this.openWindow();
  }

  onLogoutClickHandler(event)
  {
    this.store.dispatch(new UserLogout());
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
