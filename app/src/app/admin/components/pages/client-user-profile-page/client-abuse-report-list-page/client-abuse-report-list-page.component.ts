import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {AbuseReportService} from "../../../../services/abuse-report.service";
import {AbuseReport} from "../../../../../core/data/models/abuse-report.model";
import {User} from "../../../../../security/data/models/user.model";
import {ClientUserService} from "../../../../services/client-user.service";
import {Subscription} from "rxjs";
import {GlobalNotification} from "../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../core/data/models/notification.model";
import {AbuseReportOpen} from "../../../../data/actions";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-client-abuse-report-list-page',
  templateUrl: './client-abuse-report-list-page.component.html',
  styleUrls: ['./client-abuse-report-list-page.component.css']
})
export class ClientAbuseReportListPageComponent implements OnInit, OnDestroy {

  routeParamSubscription: Subscription;
  readReportSubscription: Subscription;

  infiniteScrollDisabled: boolean = false;

  user: User = null;

  list: {
    report: AbuseReport,
    reportNumber: number
  }[] = null;

  lastReport: AbuseReport = null;
  lastDate: string = null;

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientUserService,
    private reportService: AbuseReportService
  ) { }

  ngOnInit(): void {

    this.readReportSubscription = this.store.pipe(select(state => state.admin.lastReadAbuseReport), filter(report => !!report))
      .subscribe(this.reportReadHandler);

    this.routeParamSubscription = this.route.parent.params.subscribe(async (params) => {

      const { id } = params;

      try {
        this.user = await this.service.getUser(id).toPromise();
      }
      catch (error)
      {
        await this.router.navigateByUrl('./404');
        return;
      }


      await this.loadList();

    });

  }

  ngOnDestroy(): void {

    if (!!this.readReportSubscription)
    {
      this.readReportSubscription.unsubscribe()
    }

    if (!!this.routeParamSubscription)
    {
      this.routeParamSubscription.unsubscribe();
    }
  }

  async onScroll()
  {
    await this.loadList();
  }

  async loadList()
  {

    try
    {
      const list = await this.reportService.getAddresseeList(this.user, this.lastReport, this.lastDate).toPromise();

      if (!this.list)
      {
        this.list = [];
      }

      if (list.length > 0)
      {
        const latestItem = list[list.length - 1];

        this.lastReport = latestItem.report;
        this.lastDate = this.lastReport.createdAt;

        this.list = this.list.concat(list);
      }
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'CANNOT_LOAD_LIST', 'ERROR')
      ));

      await this.router.navigateByUrl('/');
    }

  }


  onReportClickHandler(event, report: AbuseReport)
  {
    this.store.dispatch(new AbuseReportOpen(report));
  }

  reportReadHandler = (report: AbuseReport) => {

    if (!this.list)
    {
      return;
    }

    const index = this.list.findIndex(item => item.report.id === report.id);
    if (index !== -1)
    {
      const item = this.list[index];

      this.list[index] = {
        ...item,
        report
      };
    }
  }
}
