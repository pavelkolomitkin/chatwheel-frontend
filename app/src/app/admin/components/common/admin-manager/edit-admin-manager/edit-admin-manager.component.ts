import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../../app.state";
import {AdminUserService} from "../../../../services/admin-user.service";
import {User} from "../../../../../security/data/models/user.model";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {AdminUserEdited, EditAdminUserInit} from "../../../../data/actions";

@Component({
  selector: 'app-edit-admin-manager',
  templateUrl: './edit-admin-manager.component.html',
  styleUrls: ['./edit-admin-manager.component.css']
})
export class EditAdminManagerComponent implements OnInit, OnDestroy {

  isSubmitting: boolean = false;

  admin: User;

  data: any = {}
  errors: any = {};

  editingSubscription: Subscription;
  editedSubscription: Subscription;

  constructor(
    private store: Store<State>,
    private service: AdminUserService
  ) { }

  ngOnInit(): void {

    this.editingSubscription = this
      .store
      .pipe(select(state => state.admin.editingAdmin))
      .subscribe(this.editAdminHandler);

    this.editedSubscription = this.store.pipe(
      select(state => state.admin.lastEditedAdminUser),
      filter(result => !!result)
    ).subscribe(this.editedHandler);

  }

  ngOnDestroy(): void {

    this.editingSubscription.unsubscribe();
    this.editedSubscription.unsubscribe();

  }

  editAdminHandler = (admin: User) => {

    this.errors = {};
    this.admin = admin;

    if (this.admin)
    {
      const { id, email, fullName } = this.admin;

      this.data = {
        id,
        email,
        fullName
      }
    }
  }

  editedHandler = (admin: User) => {

    this.store.dispatch(new EditAdminUserInit(null));

  }

  onWindowCloseHandler(event)
  {
    this.store.dispatch(new EditAdminUserInit(null));
  }

  async onSubmitHandler(event)
  {
    this.isSubmitting = true;

    try {

      this.admin = await this.service.edit(this.admin, this.data).toPromise();
      this.store.dispatch(new AdminUserEdited(this.admin));
    }
    catch (error)
    {
      this.errors = error.error.errors || error.message;
    }

    this.isSubmitting = false;
  }

}
