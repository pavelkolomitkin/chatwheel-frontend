import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {AdminUserService} from "../../../../services/admin-user.service";
import {filter} from "rxjs/operators";
import {Subscription} from "rxjs";
import {User} from "../../../../../security/data/models/user.model";
import {
  AdminUserBlocked,
  AdminUserUnBlocked,
  BlockAdminUserInit,
  UnBlockAdminUserInit,
} from "../../../../data/actions";

@Component({
  selector: 'app-block-admin-manager',
  templateUrl: './block-admin-manager.component.html',
  styleUrls: ['./block-admin-manager.component.css']
})
export class BlockAdminManagerComponent implements OnInit, OnDestroy {

  isSubmitting: Boolean = false;

  blockingAdmin: User = null;
  blockingReason: string = '';
  blockingReasonErrors: any = {};

  unBlockingAdmin: User = null;

  blockingSubscription: Subscription;
  blockedSubscription: Subscription;

  unBlockingSubscription: Subscription;
  unBlockedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  ngOnInit(): void {

    this.blockingSubscription = this.store.pipe(
      select(state => state.admin.blockingAdmin)
    ).subscribe(this.blockAdminHandler);

    this.blockedSubscription = this.store.pipe(
      select(state => state.admin.lastBlockedAdmin),
      filter(result => !!result)
    ).subscribe(this.adminUserBlockedHandler);


    this.unBlockingSubscription = this.store.pipe(
      select(state => state.admin.unBlockingAdmin)
    ).subscribe(this.unBlockAdminHandler);

    this.unBlockedSubscription = this.store.pipe(
      select(state => state.admin.lastUnBlockedAdmin),
      filter(result => !!result)
    ).subscribe(this.adminUserUnBlockedHandler);

  }

  ngOnDestroy(): void {

    this.blockingSubscription.unsubscribe();
    this.blockedSubscription.unsubscribe();
  }


  blockAdminHandler = (admin: User) => {

    this.blockingReason = '';
    this.blockingAdmin = admin;
  }

  adminUserBlockedHandler = (admin: User) => {

    this.store.dispatch(new BlockAdminUserInit(null));
  }

  onBlockAdminWindowCloseHandler(event)
  {
    this.store.dispatch(new BlockAdminUserInit(null));
  }

  async onBlockClickHandler(event)
  {
    this.isSubmitting = true;

    try {
      const admin: User = await this.service.block(this.blockingAdmin, { reason: this.blockingReason }).toPromise();
      this.store.dispatch(new AdminUserBlocked(admin));
    }
    catch (error)
    {
      this.blockingReasonErrors = error.error.errors || error.message;
    }

    this.isSubmitting = false;
  }

  unBlockAdminHandler = (admin: User) => {

    this.unBlockingAdmin = admin;
  }

  adminUserUnBlockedHandler = (admin: User) => {

    this.store.dispatch(new UnBlockAdminUserInit(null));
  }

  onUnBlockAdminWindowCloseHandler(event)
  {
    this.store.dispatch(new UnBlockAdminUserInit(null));
  }

  async onUnBlockClickHandler(event)
  {
    this.isSubmitting = true;

    const admin: User = await this.service.unBlock(this.unBlockingAdmin).toPromise();
    this.store.dispatch(new AdminUserUnBlocked(admin));

    this.isSubmitting = false;
  }

}
