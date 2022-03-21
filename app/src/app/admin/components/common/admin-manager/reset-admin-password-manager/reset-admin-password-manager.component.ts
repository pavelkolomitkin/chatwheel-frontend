import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {AdminUserService} from "../../../../services/admin-user.service";
import {filter} from "rxjs/operators";
import {ResetPasswordAdminUser} from "../../../../data/model/reset-password-admin-user.model";
import {AdminUserPasswordReset, ResetPasswordAdminUserInit} from "../../../../data/actions";

@Component({
  selector: 'app-reset-admin-password-manager',
  templateUrl: './reset-admin-password-manager.component.html',
  styleUrls: ['./reset-admin-password-manager.component.css']
})
export class ResetAdminPasswordManagerComponent implements OnInit, OnDestroy {

  isSubmitting: boolean = false;

  admin: User = null;
  data: any = {
    password: '',
    passwordRepeat: ''
  };
  errors: any = {};



  resetAdminPasswordSubscription: Subscription;
  adminPasswordResetSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  ngOnInit(): void {

    this.resetAdminPasswordSubscription = this
      .store
      .pipe(select(state => state.admin.resettingPasswordAdmin))
      .subscribe(this.resetAdminPasswordHandler);

    this.adminPasswordResetSubscription = this.store.pipe(
      select(state => state.admin.lastPasswordResetAdminUser),
      filter(result => !!result)
    ).subscribe(this.adminPasswordResetHandler);

  }

  ngOnDestroy(): void {

    this.resetAdminPasswordSubscription.unsubscribe();
    this.adminPasswordResetSubscription.unsubscribe();
  }

  resetAdminPasswordHandler = (admin: User) => {

    this.errors = {};
    this.admin = admin;
  }

  adminPasswordResetHandler = (admin: User) => {
    this.store.dispatch(new ResetPasswordAdminUserInit(null));
  }

  async onResetAdminPasswordClickHandler(event)
  {
    this.isSubmitting = true;

    const data: ResetPasswordAdminUser = this.data;

    try {
      const admin: User = await this.service.resetPassword(this.admin, data).toPromise();
      this.store.dispatch(new AdminUserPasswordReset(admin));
    }
    catch (error)
    {
      this.errors = error.error.errors || error.message;
    }

    this.isSubmitting = false;
  }

  onResetAdminPasswordCloseWindowHandler(event)
  {
    this.store.dispatch(new ResetPasswordAdminUserInit(null));
  }

}
