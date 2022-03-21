import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbuseReportFormFilter} from "../../../../data/model/abuse-report-form.filter";
import {NgForm} from "@angular/forms";
import {AbuseReportType} from "../../../../../core/data/models/abuse-report-type.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {Observable} from "rxjs";

@Component({
  selector: 'app-abuse-report-list-filter-form',
  templateUrl: './abuse-report-list-filter-form.component.html',
  styleUrls: ['./abuse-report-list-filter-form.component.css']
})
export class AbuseReportListFilterFormComponent implements OnInit {

  @Output('onChange') changeEmitter: EventEmitter<AbuseReportFormFilter> = new EventEmitter<AbuseReportFormFilter>();

  @Input() isNew: boolean;

  @Input() type: AbuseReportType;

  types: Observable<AbuseReportType[]>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.types = this.store.pipe(select(state => state.admin.abuseReportTypes));
  }

  onFormChangeHandler(form: NgForm)
  {
    const data = form.value;

    this.changeEmitter.emit(data);
  }

  compareEntity(a: any, b: any)
  {
    if (!a || !b)
    {
      return false;
    }

    return a.id === b.id;
  }

}
