import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {AbuseReportService} from "../../../services/abuse-report.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AbuseReportListFilter} from "../../../data/model/abuse-report-list.filter";
import {SortingType} from "../../../../core/data/models/sorting-type.enum";
import {AbuseReport} from "../../../../core/data/models/abuse-report.model";
import {AbuseReportOpen, GetAbuseReportNumbers} from "../../../data/actions";
import {GlobalNotification} from "../../../../core/data/actions";
import {Notification, NotificationType} from "../../../../core/data/models/notification.model";
import {AbuseReportFormFilter} from "../../../data/model/abuse-report-form.filter";
import {filter, first} from "rxjs/operators";
import {AbuseReportType} from "../../../../core/data/models/abuse-report-type.model";

@Component({
  selector: 'app-abuse-report-list-page',
  templateUrl: './abuse-report-list-page.component.html',
  styleUrls: ['./abuse-report-list-page.component.css']
})
export class AbuseReportListPageComponent implements OnInit, OnDestroy {

  static AVAILABLE_SORT_FIELDS = {
    createdAt: 'createdAt'
  };

  defaultSortField: string = AbuseReportListPageComponent.AVAILABLE_SORT_FIELDS.createdAt;
  defaultSortType: SortingType = SortingType.DESC;


  totalNumber: number;
  newNumber: Observable<number>;
  list: AbuseReport[] = null;

  queryParamSubscription: Subscription;
  reportReadSubscription: Subscription;

  abuseTypes: AbuseReportType[] = [];
  filter: AbuseReportListFilter = {
    new: false,
    type: null,
    sortType: null,
    sortField: null
  };


  constructor(
    private store: Store<State>,
    private service: AbuseReportService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.newNumber = this.store.pipe(select(state => state.admin.newAbuseReportNumber));

    this.abuseTypes = await this.store.pipe(
      select(state => state.admin.abuseReportTypes),
      filter(list => list.length > 0),
      first()
    ).toPromise();

    this.reportReadSubscription = this.store.pipe(
      select(state => state.admin.lastReadAbuseReport),
      filter(result => !!result)
      ).subscribe(this.onReportReadHandler);

    this.queryParamSubscription = this.route.queryParams.subscribe( async (params) => {

      this.store.dispatch(new GetAbuseReportNumbers());

      this.filter = this.getCurrentFilter();

      await this.loadList();
    });
  }

  onReportReadHandler = (report: AbuseReport) => {

    if (!this.list)
    {
      return;
    }

    const index = this.list.findIndex(item => item.id === report.id);
    if (index !== -1)
    {
      this.list[index] = report;
    }
  }

  async onFilterFormChangeHandler(filter: AbuseReportFormFilter)
  {
    const params: any = {
      ...filter,
      page: 1
    };

    if (params.type)
    {
      params.type = params.type.id;
    }

    await this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: params,
        queryParamsHandling: "merge"
      }
    );
  }

  ngOnDestroy(): void {

    this.queryParamSubscription.unsubscribe();
    this.reportReadSubscription.unsubscribe();

  }

  getCurrentListPage()
  {
    let param = !!this.route.snapshot.queryParams['page'] ? parseInt(this.route.snapshot.queryParams['page']) : 1;
    return (param > 0) ? param : 1;
  }

  getCurrentFilter(): AbuseReportListFilter
  {
    let {
      isNew,
      type,
      sortType,
      sortField,
    } = this.route.snapshot.queryParams;

    sortField =
      AbuseReportListPageComponent.AVAILABLE_SORT_FIELDS[sortField] ?
        AbuseReportListPageComponent.AVAILABLE_SORT_FIELDS[sortField] :
        this.defaultSortField
    ;

    sortType = !sortType ? this.defaultSortType : sortType;

    return {
      new: !!isNew ? JSON.parse(isNew) : null,
      type: !!type ? this.abuseTypes.find(item => item.id === type) : null,
      sortType: sortType,
      sortField: sortField,
    };
  }

  async loadList()
  {
    const page: number = this.getCurrentListPage();
    const filter: AbuseReportListFilter = this.getCurrentFilter();

    try {

      const { list, foundNumber } = await this.service.getList(filter, page).toPromise();

      this.list = list;
      this.totalNumber = foundNumber;

    }
    catch (error)
    {
      this.store.dispatch(new GlobalNotification(
        new Notification(NotificationType.ERROR, 'CANNOT_LOAD_LIST', 'ERROR')
      ));

      await this.router.navigateByUrl('/');
    }

  }

  onReportClickHandler(report: AbuseReport)
  {
    this.store.dispatch(new AbuseReportOpen(report));
  }

}
