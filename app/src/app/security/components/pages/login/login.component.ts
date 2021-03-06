import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginCredentials} from "../../../data/models/login-credentials.model";
import {UserLoginError, UserLoginStart} from "../../../data/actions";
import {Observable, Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  error: Observable<string>;

  authorizedUserSubscription: Subscription = null;

  fbAuthorizationLink: string = environment.fbAuthorizationLink;
  vkAuthorizationLink: string = environment.vkAuthorizationLink;

  constructor(
    private store: Store<State>, private router: Router
  ) { }

  ngOnInit(): void {

    this.store.dispatch(new UserLoginError({}));

    this.authorizedUserSubscription = this.store.pipe(
      select(state => state.security.user),
      filter(result => !!result)
    ).subscribe(() => {
      this.router.navigateByUrl('/');
    });


    this.error = this.store.pipe(
      select(state => state.security.loginErrors),
      filter(result => {
        return Object.keys(result).length > 0;
      })
    ).pipe(
      map(data => {
        // @ts-ignore
        return data.message || 'LOGIN_ERROR';
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
