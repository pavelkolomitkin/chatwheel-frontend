import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginCredentials} from "../../../data/models/login-credentials.model";
import {UserLoginStart} from "../../../data/actions";
import {Observable, Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errors: Observable<Object>;

  authorizedUserSubscription: Subscription = null;

  constructor(
    private store: Store<State>, private router: Router
  ) { }

  ngOnInit(): void {

    this.authorizedUserSubscription = this.store.pipe(
      select(state => state.security.user),
      filter(result => !!result)
    ).subscribe(() => {
      this.router.navigateByUrl('/');
    });

    this.errors = this.store.pipe(
      select(state => state.security.loginErrors),
      filter(result => {
        return Object.keys(result).length > 0;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.authorizedUserSubscription !== null)
    {
      this.authorizedUserSubscription.unsubscribe();
      this.authorizedUserSubscription = null;
    }
  }

  onSubmit(form: NgForm)
  {
    const { email, password, rememberMe } = form.value;

    const credentials: LoginCredentials = {
      email, password
    };

    this.store.dispatch(new UserLoginStart(credentials, rememberMe))
  }

}
