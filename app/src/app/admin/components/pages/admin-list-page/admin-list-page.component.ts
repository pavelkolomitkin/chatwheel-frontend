import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {AdminUserService} from "../../../services/admin-user.service";
import {Observable} from "rxjs";
import {CreateAdminUserInit} from "../../../data/actions";
import {User} from "../../../../security/data/models/user.model";

@Component({
  selector: 'app-admin-list-page',
  templateUrl: './admin-list-page.component.html',
  styleUrls: ['./admin-list-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminListPageComponent implements OnInit, OnDestroy {

  list: User[] = null;

  totalNumber: Observable<number>;

  currentPage: number = 1;

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  async ngOnInit() {

    this.totalNumber = this.store.pipe(select(state => state.admin.adminTotalNumber));

    //await this.loadList();
  }

  ngOnDestroy(): void {
  }

  onCreateAccountClickHandler(event)
  {
    this.store.dispatch(new CreateAdminUserInit(true));
  }

  async loadList()
  {
    try {

      //this.service.getList(this.)

    }
    catch (error)
    {

    }
  }
}
