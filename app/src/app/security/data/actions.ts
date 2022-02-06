import { Action } from '@ngrx/store';
import {LoginCredentials} from "./models/login-credentials.model";
import {User} from "./models/user.model";

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_INITIALIZATION_START = 'USER_INITIALIZATION_START';
export const USER_INITIALIZATION_SUCCESS = 'USER_INITIALIZATION_SUCCESS';
export const USER_INITIALIZATION_ERROR = 'USER_INITIALIZATION_ERROR';

export const USER_TOKEN_INITIALIZE_STORE = 'USER_TOKEN_INITIALIZE_STORE';

export const USER_LOGOUT = 'USER_LOGOUT';

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

export class UserInitializationStart implements Action
{
  readonly type = USER_INITIALIZATION_START;
}

export class UserInitializationSuccess implements Action
{
  readonly type = USER_INITIALIZATION_SUCCESS;

  constructor(public user: User) {}
}

export class UserInitializationError implements Action
{
  readonly type = USER_INITIALIZATION_ERROR;
}

export class UserTokenInitializesStore implements Action
{
  readonly type = USER_TOKEN_INITIALIZE_STORE;

  constructor(public token: string) { }
}

export class UserLogout implements Action
{
  readonly type = USER_LOGOUT;
}

export type SecurityActions =
  UserLoginStart
  | UserLoginSuccess
  | UserLoginError

  | UserInitializationStart
  | UserInitializationSuccess
  | UserInitializationError

  | UserTokenInitializesStore

  | UserLogout
  ;
