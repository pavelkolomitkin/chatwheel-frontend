import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../../../../app.state";
import {first} from "rxjs/operators";
import {UserBlockToggleStart, UserReportAbuseInit} from "../../../../../../../data/actions";
import {UserInitiateDirectCall} from "../../../../../../../data/calls/actions";

@Component({
  selector: 'app-report-abuse-buttons',
  templateUrl: './report-abuse-buttons.component.html',
  styleUrls: ['./report-abuse-buttons.component.css']
})
export class ReportAbuseButtonsComponent implements OnInit {

  @Input() user: User;

  authorizedUser: User;

  constructor(
    private store: Store<State>
  ) { }

  async ngOnInit() {
    this.authorizedUser = await this.store.pipe(select(state => state.security.user), first()).toPromise();
  }

  onReportAbuseClickHandler(event)
  {
    this.store.dispatch(new UserReportAbuseInit(this.user));
  }

  onUnblockClickHandler(event)
  {
    this.store.dispatch(new UserBlockToggleStart(this.user, false));
  }

  onCallClickHandler(event)
  {
    this.store.dispatch(new UserInitiateDirectCall(this.user));
  }
}
