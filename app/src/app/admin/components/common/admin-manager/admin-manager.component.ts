import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {AdminUserCreated, CreateAdminUserInit, GetTotalNumberAdminUsers} from "../../../data/actions";
import {NgForm} from "@angular/forms";
import {CreateAdminUser} from "../../../data/model/create-admin-user.model";
import {AdminUserService} from "../../../services/admin-user.service";
import {User} from "../../../../security/data/models/user.model";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin-manager.component.html',
  styleUrls: ['./admin-manager.component.css']
})
export class AdminManagerComponent implements OnInit, OnDestroy {

  isCreateAdminWindowShown: boolean = false;
  isSubmitting: boolean = false;
  createAccountErrors: any = {};


  createAdminInitSubscription: Subscription;
  adminCreatedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  ngOnInit(): void {

    this.store.dispatch(new GetTotalNumberAdminUsers());

    this.createAdminInitSubscription = this.store.pipe(
      select(state => state.admin.createAdminInit)
    ).subscribe(this.createAdminInitHandler);

    this.adminCreatedSubscription = this.store.pipe(
      select(state => state.admin.lastCreatedAdminUser),
      filter(result => !!result)
    ).subscribe(this.adminCreatedHandler);

  }

  ngOnDestroy(): void {

    this.createAdminInitSubscription.unsubscribe();
    this.adminCreatedSubscription.unsubscribe();
  }


  createAdminInitHandler = (isInit: boolean) => {

    this.isCreateAdminWindowShown = isInit;
  }

  adminCreatedHandler = (admin: User) => {

    this.isCreateAdminWindowShown = false;
    this.createAccountErrors = {};

    this.store.dispatch(new GetTotalNumberAdminUsers());
  }

  onCreateAdminWindowCloseHandler(event)
  {
    this.store.dispatch(new CreateAdminUserInit(false));
  }

  async onCreateAdminClickHandler(event, form: NgForm)
  {

    this.isSubmitting = true;

    const { fullName, email, password, passwordRepeat } = form.value;

    const data: CreateAdminUser = {
      fullName,
      email,
      password,
      passwordRepeat
    };

    try {
      const admin: User = await this.service.create(data).toPromise();
      this.createAccountErrors = {};

      this.store.dispatch(new AdminUserCreated(admin));
    }
    catch (error)
    {
      this.createAccountErrors = error.error.errors || error.message;
    }

    this.isSubmitting = false;
  }
}
