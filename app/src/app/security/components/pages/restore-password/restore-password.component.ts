import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Observable, of, Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {RestorePasswordData} from "../../../data/models/restore-password-data.model";
import {UserChangePasswordStart} from "../../../data/actions";
import {GlobalProgressHide, GlobalProgressShow} from "../../../../core/data/actions";
import {SecurityService} from "../../../services/security.service";
import {PasswordChangeActions} from "../../../data/reducer";

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit, OnDestroy {

  errors: Observable<Object>;

  isKeyChecked: boolean = false;
  keyCheckError: string = null;

  restorePasswordKey: string;

  isPasswordChanged: boolean = false;

  keySubscription: Subscription = null;
  passwordChangedSubscription: Subscription = null;


  constructor(
    private store: Store<State>,
    private router: Router,
    private route: ActivatedRoute,
    private service: SecurityService
  ) { }

  ngOnInit(): void {

    this.isKeyChecked = false;
    this.isPasswordChanged = false;

    this.errors = this.store.pipe(select(state => state.security.changePasswordErrors));

    this.keySubscription = this.route.params.pipe(
      map(params => params.key),
      filter(key => !!key)
    ).subscribe(async (key) => {

      if (this.restorePasswordKey !== key)
      {
        this.isKeyChecked = false;
        this.isPasswordChanged = false;
        this.restorePasswordKey = key;

        this.store.dispatch(new GlobalProgressShow());

        try {

          await this.service.restorePasswordKeyVerify(this.restorePasswordKey).toPromise();
          this.keyCheckError = null;
        }
        catch (error)
        {
          this.keyCheckError = error.error.errors.message;
        }

        this.isKeyChecked = true;

        this.store.dispatch(new GlobalProgressHide());
      }

    });

    this.passwordChangedSubscription = this.store.pipe(
      select(state => state.security.passwordChangeAction),
      filter(action => action === PasswordChangeActions.SUCCESS)
    ).subscribe(() => {
      this.isPasswordChanged = true;
    });
  }

  ngOnDestroy(): void {
    if (this.keySubscription !== null)
    {
      this.keySubscription.unsubscribe();
      this.keySubscription = null;
    }

    if (this.passwordChangedSubscription !== null)
    {
      this.passwordChangedSubscription.unsubscribe();
      this.passwordChangedSubscription = null;
    }
  }

  onSubmit(form: NgForm)
  {
    const { password, passwordRepeat } = form.value;
    const data: RestorePasswordData = {
      key: this.restorePasswordKey,
      password,
      passwordRepeat
    };

    this.store.dispatch(new UserChangePasswordStart(data));
  }
}
