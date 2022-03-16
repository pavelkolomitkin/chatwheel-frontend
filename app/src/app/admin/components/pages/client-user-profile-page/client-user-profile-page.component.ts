import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ClientUserService} from "../../../services/client-user.service";
import {User} from "../../../../security/data/models/user.model";
import {filter} from "rxjs/operators";
import {AbuseReportService} from "../../../services/abuse-report.service";
import {AbuseReport} from "../../../../core/data/models/abuse-report.model";
import {AbuseReportReadSuccess} from "../../../data/actions";

@Component({
  selector: 'app-client-user-profile-page',
  templateUrl: './client-user-profile-page.component.html',
  styleUrls: ['./client-user-profile-page.component.css']
})
export class ClientUserProfilePageComponent implements OnInit, OnDestroy {

  routeParamSubscription: Subscription;
  lastBlockedUserSubscription: Subscription;
  lastUnBlockedUserSubscription: Subscription;
  lastDeletedUserSubscription: Subscription;
  lastReadReportSubscription: Subscription;

  user: User = null;

  totalReportNumber: number = 0;
  newReportNumber: number = 0;

  peopleApplied: number

  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private service: ClientUserService,
    private abuseReportService: AbuseReportService
  ) { }

  ngOnInit(): void {

    this.lastReadReportSubscription = this
      .store
      .pipe(
        select(state => state.admin.lastReadAbuseReport),
        filter(report => !!report)
      )
      .subscribe(this.lastReadReportHandler)

    this.lastBlockedUserSubscription = this.store.pipe(
      select(state => state.admin.lastBlockedUser),
      filter(user => !!user))
      .subscribe(this.modifiedUserHandler);

    this.lastUnBlockedUserSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockedUser),
      filter(user => !!user))
      .subscribe(this.modifiedUserHandler);

    this.lastDeletedUserSubscription = this.store.pipe(
      select(state => state.admin.lastDeletedUser),
      filter(user => !!user))
      .subscribe(this.modifiedUserHandler);

    this.routeParamSubscription = this.route.params.subscribe( async (params) => {

      this.user = null;

      const { id } = params;

      try {
        this.user = await this.service.getUser(id).toPromise();
      }
      catch (error)
      {
        await this.router.navigateByUrl('./404');
        return;
      }

      await this.updateReportNumber();


    });

  }

  ngOnDestroy(): void {

    this.lastReadReportSubscription.unsubscribe();
    this.routeParamSubscription.unsubscribe();
    this.lastBlockedUserSubscription.unsubscribe();
    this.lastUnBlockedUserSubscription.unsubscribe();
    this.lastDeletedUserSubscription.unsubscribe();

    this.store.dispatch(new AbuseReportReadSuccess(null));
  }

  async updateReportNumber()
  {
    try {
      this.peopleApplied = await this.abuseReportService.getNumberPeopleApplied(this.user).toPromise();
      const { total, newNumber } = await this.abuseReportService.getReportNumberReceived(this.user).toPromise();

      this.totalReportNumber = total;
      this.newReportNumber = newNumber;
    }
    catch (error)
    {
      await this.router.navigateByUrl('./404');
      return;
    }
  }

  modifiedUserHandler = (user: User) => {

    if (this.user.id != user.id)
    {
      return;
    }

    this.user = user;

  }

  lastReadReportHandler = async (report: AbuseReport) => {

    if (!this.user)
    {
      return;
    }

    if (this.user.id === report.respondent.id)
    {
      await this.updateReportNumber();
    }

  }

}
