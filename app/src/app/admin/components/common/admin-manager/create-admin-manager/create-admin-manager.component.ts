import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";
import {User} from "../../../../../security/data/models/user.model";
import {AdminUserCreated, CreateAdminUserInit, GetTotalNumberAdminUsers} from "../../../../data/actions";
import {NgForm} from "@angular/forms";
import {CreateAdminUser} from "../../../../data/model/create-admin-user.model";
import {State} from "../../../../../app.state";
import {AdminUserService} from "../../../../services/admin-user.service";

@Component({
  selector: 'app-create-admin-manager',
  templateUrl: './create-admin-manager.component.html',
  styleUrls: ['./create-admin-manager.component.css']
})
export class CreateAdminManagerComponent implements OnInit, OnDestroy {

  createAdminInitSubscription: Subscription;
  adminCreatedSubscription: Subscription;

  isSubmitting: boolean = false;

  isWindowShown: boolean = false;
  errors: any = {};
  data = {
    fullName: '',
    email: '',
    password: '',
    passwordRepeat: ''
  }

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  ngOnInit(): void {

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

    // @ts-ignore
    this.data = {};
    this.errors = {}
    this.isWindowShown = isInit;
  }

  adminCreatedHandler = (admin: User) => {

    this.isWindowShown = false;

    this.store.dispatch(new GetTotalNumberAdminUsers());
  }

  onCreateAdminWindowCloseHandler(event)
  {
    this.store.dispatch(new CreateAdminUserInit(false));
  }

  async onCreateAdminClickHandler(event)
  {

    this.isSubmitting = true;

    const { fullName, email, password, passwordRepeat } = this.data;

    const data: CreateAdminUser = {
      fullName,
      email,
      password,
      passwordRepeat
    };

    try {
      const admin: User = await this.service.create(data).toPromise();
      this.store.dispatch(new AdminUserCreated(admin));
    }
    catch (error)
    {
      this.errors = error.error.errors || error.message;
    }

    this.isSubmitting = false;
  }

}
