import { Action } from '@ngrx/store';
import {LoginCredentials} from "./models/login-credentials.model";

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export class UserLoginStart implements Action
{
  readonly type = USER_LOGIN_START;

  constructor(public credentials: LoginCredentials, public rememberUser: boolean = false) { }
}

export class UserLoginSuccess implements Action
{
  readonly type = USER_LOGIN_SUCCESS;

  constructor(public token: string, public rememberUser: boolean = false) {}
}

export class UserLoginError implements Action
{
  readonly type = USER_LOGIN_ERROR;

  constructor(public errors: Object) { }
}

export type SecurityActions = UserLoginStart
                | UserLoginSuccess
                | UserLoginError;
