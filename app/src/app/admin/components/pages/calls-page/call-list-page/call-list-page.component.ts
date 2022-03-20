import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {first, map} from "rxjs/operators";
import {CallService} from "../../../../services/call.service";
import {Subscription} from "rxjs";
import {CallListFilter} from "../../../../data/model/call-list.filter";
import {Call} from "../../../../../client/data/model/calls/call.model";
import {GlobalNotification} from "../../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../../core/data/models/notification.model";
import {CallListFormFilter} from "../../../../data/model/call-list-form.filter";

@Component({
  selector: 'app-call-list-page',
  templateUrl: './call-list-page.component.html',
  styleUrls: ['./call-list-page.component.css']
})
export class CallListPageComponent implements OnInit, OnDestroy {

  queryParamSubscription: Subscription;

  filter: CallListFilter = {
    isDirect: null,
    startDate: null,
    endDate: null
  };

  list: Call[] = null;
  totalNumber: number;


  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router,
    private service: CallService
  ) { }

  async ngOnInit() {

     this.filter.isDirect = await this.route.data.pipe(
       map(data => data.isDirect),
       first()
     ).toPromise();

     this.queryParamSubscription = this.route.queryParams.subscribe(async (params) => {

       this.filter = this.getCurrentFilter();

       await this.loadList();
     });


  }

  ngOnDestroy(): void {

    this.queryParamSubscription.unsubscribe();

  }

  getCurrentFilter(): CallListFilter
  {
    let {
      startDate,
      endDate
    } = this.route.snapshot.queryParams;

    endDate = !endDate ? new Date() : new Date(endDate);

    if (!startDate)
    {
      startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 1);
    }
    else
    {
      startDate = new Date(startDate);
    }


    return {
      ...this.filter,
      startDate,
      endDate
    }
  }

  getCurrentListPage()
  {
    let param = !!this.route.snapshot.queryParams['page'] ? parseInt(this.route.snapshot.queryParams['page']) : 1;
    return (param > 0) ? param : 1;
  }

  async loadList()
  {
    const filter:CallListFilter = this.getCurrentFilter();
    const page: number = this.getCurrentListPage();

    try {

       const { calls, number } = await this.service.getList(filter, page).toPromise();

       this.list = calls;
       this.totalNumber = number;
    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'CANNOT_LOAD_LIST', 'ERROR')
      ));

      await this.router.navigateByUrl('/');
    }
  }

  async onDateChangeHandler(data: CallListFormFilter)
  {
    const { startDate, endDate } = data;

    const params = {
      ...this.route.snapshot.queryParams,
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
      page: 1
    };

    await this.router.navigate([], {
      queryParams: params,
      queryParamsHandling: "merge",
      relativeTo: this.route
    });
  }

}
