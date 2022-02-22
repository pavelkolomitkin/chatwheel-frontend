import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../app.state";
import {first} from "rxjs/operators";
import {UserBlockToggleStart, UserReportAbuseInit} from "../../../../../data/actions";

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.css']
})
export class ActionMenuComponent implements OnInit, OnDestroy {

  @Input() user: User

  authorizedUser: User = null;

  constructor(
    private store: Store<State>
  ) { }

  async ngOnInit() {

    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();

  }

  ngOnDestroy(): void {
  }

  onReportAbuseClickHandler(event)
  {
    this.store.dispatch(new UserReportAbuseInit(this.user));
  }

  onUnblockUserClickHandler(event)
  {
    this.store.dispatch(new UserBlockToggleStart(this.user, false));
  }
}
