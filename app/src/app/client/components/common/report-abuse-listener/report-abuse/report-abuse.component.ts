import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {AbuseReportTypeService} from "../../../../../core/services/abuse-report-type.service";
import {AbuseReportType} from "../../../../../core/data/models/abuse-report-type.model";
import {User} from "../../../../../security/data/models/user.model";
import {UserReportAbuseInit, UserReportAbuseStart} from "../../../../data/actions";

@Component({
  selector: 'app-report-abuse',
  templateUrl: './report-abuse.component.html',
  styleUrls: ['./report-abuse.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportAbuseComponent implements OnInit, OnDestroy {

  types: AbuseReportType[] = [];

  abuseType: AbuseReportType = null;
  abuseComment: string = null;

  isWindowShown: boolean = false;

  _recipient: User = null;

  @Input() set recipient(value: User)
  {
    this.abuseType = null;
    this.abuseComment = null;

    this._recipient = value;
    this.isWindowShown = !!this._recipient;

    this.changeDetector.detectChanges();
  }

  constructor(
    private store: Store<State>,
    private abuseTypeService: AbuseReportTypeService,
    private changeDetector: ChangeDetectorRef
  ) { }

  async ngOnInit() {

    this.types = await this.abuseTypeService.getList().toPromise();

  }

  ngOnDestroy(): void {
    this.isWindowShown = false;
  }

  onReportClickHandler(event)
  {
    this.store.dispatch(new UserReportAbuseStart(
      this._recipient,
      this.abuseType,
      this.abuseComment
    ));
  }

  onWindowCloseHandler(event)
  {
    this.store.dispatch(new UserReportAbuseInit(null));
  }
}
