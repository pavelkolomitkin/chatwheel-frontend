import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {State} from "../../../../app.state";
import {UserRegisterStart} from "../../../data/actions";
import {RegisterData} from "../../../data/models/register-data.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: Observable<Object>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {

    this.errors = this.store.pipe(select(state => state.security.registerErrors))
  }

  onSubmit(form: NgForm)
  {
    const { email, password, passwordRepeat, fullName } = form.value;

    const data: RegisterData = {
      email, password, passwordRepeat, fullName
    }

    this.store.dispatch(new UserRegisterStart(data));
  }

}
