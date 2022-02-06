import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../../../data/reducer";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {LoginCredentials} from "../../../data/models/login-credentials.model";
import {UserLoginStart} from "../../../data/actions";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errors: Observable<Object>;

  constructor(
    private store: Store<State>, private router: Router
  ) { }

  ngOnInit(): void {

    // this.errors = store.pipe(
    //   select(state => state.security.loginErrors),
    //   filter(result => Object.keys(result).length > 0)
    // );
    this.errors = this.store.pipe(
      select(state => state.loginErrors),
      filter( result => !!result),
      filter(result => {
        debugger
        return Object.keys(result).length > 0;
      })
    );
  }

  ngOnDestroy(): void {
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
