import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../../../security/data/models/user.model";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {AdminUserService} from "../../../../services/admin-user.service";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {AdminUserDeleted, DeleteAdminUserInit} from "../../../../data/actions";

@Component({
  selector: 'app-delete-admin-manager',
  templateUrl: './delete-admin-manager.component.html',
  styleUrls: ['./delete-admin-manager.component.css']
})
export class DeleteAdminManagerComponent implements OnInit, OnDestroy {

  isSubmitting: boolean = false;

  admin: User;

  deletingSubscription: Subscription;
  deletedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  ngOnInit(): void {

    this.deletingSubscription = this.store.pipe(
      select(state => state.admin.deletingAdmin)
    ).subscribe(this.deleteAdminHandler);

    this.deletedSubscription = this.store.pipe(
      select(state => state.admin.lastDeletedAdmin),
      filter(result => !!result)
    ).subscribe(this.adminDeletedHandler);

  }

  ngOnDestroy(): void {

    this.deletingSubscription.unsubscribe();
    this.deletedSubscription.unsubscribe();

  }

  deleteAdminHandler = (admin: User) => {
    this.admin = admin;
  }

  adminDeletedHandler = (admin: User) => {
    this.store.dispatch(new DeleteAdminUserInit(null));
  }

  onWindowCloseHandler(event)
  {
    this.store.dispatch(new DeleteAdminUserInit(null));
  }

  async onDeleteClickHandler(event)
  {
    this.isSubmitting = true;

    const admin: User = await this.service.delete(this.admin).toPromise();
    this.store.dispatch(new AdminUserDeleted(admin));

    this.isSubmitting = false;
  }

}
