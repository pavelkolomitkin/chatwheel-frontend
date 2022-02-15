import { Action } from '@ngrx/store';
import {LoginCredentials} from "./models/login-credentials.model";
import {User} from "./models/user.model";
import {RegisterData} from "./models/register-data.model";
import {RestorePasswordData} from "./models/restore-password-data.model";

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';

export const USER_REGISTER_CONFIRM_START = 'USER_REGISTER_CONFIRM_START';
export const USER_REGISTER_CONFIRM_SUCCESS = 'USER_REGISTER_CONFIRM_SUCCESS';
export const USER_REGISTER_CONFIRM_ERROR = 'USER_REGISTER_CONFIRM_ERROR';

export const USER_INITIALIZATION_START = 'USER_INITIALIZATION_START';
export const USER_INITIALIZATION_SUCCESS = 'USER_INITIALIZATION_SUCCESS';
export const USER_INITIALIZATION_ERROR = 'USER_INITIALIZATION_ERROR';

export const USER_CHANGE_PASSWORD_START = 'USER_CHANGE_PASSWORD_START';
export const USER_CHANGE_PASSWORD_SUCCESS = 'USER_CHANGE_PASSWORD_SUCCESS';
export const USER_CHANGE_PASSWORD_ERROR = 'USER_CHANGE_PASSWORD_ERROR';

export const USER_TOKEN_INITIALIZE_STORE = 'USER_TOKEN_INITIALIZE_STORE';

export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_UPDATED = 'USER_UPDATED';

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

export class UserRegisterStart implements Action
{
  readonly type = USER_REGISTER_START;

  constructor(public data: RegisterData) {}
}

export class UserRegisterSuccess implements Action
{
  readonly type = USER_REGISTER_SUCCESS;
}

export class UserRegisterError implements Action
{
  readonly type = USER_REGISTER_ERROR;

  constructor(public errors: Object) { }
}

export class UserRegisterConfirmStart implements Action
{
  readonly type = USER_REGISTER_CONFIRM_START;

  constructor(public key: string) {}
}

export class UserRegisterConfirmSuccess implements Action
{
  readonly type = USER_REGISTER_CONFIRM_SUCCESS;

  constructor(public token: string) { }
}

export class UserRegisterConfirmError implements Action
{
  readonly type = USER_REGISTER_CONFIRM_ERROR;
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

export class UserChangePasswordStart implements Action
{
  readonly type = USER_CHANGE_PASSWORD_START;

  constructor(public data: RestorePasswordData) { }
}

export class UserChangePasswordSuccess implements Action
{
  readonly type = USER_CHANGE_PASSWORD_SUCCESS;
}

export class UserChangePasswordError implements Action
{
  readonly type = USER_CHANGE_PASSWORD_ERROR;

  constructor(public errors: Object) { }
}

export class UserUpdated implements Action
{
  readonly type = USER_UPDATED;

  constructor(public user: User) { }
}

export type SecurityActions =
  UserLoginStart
  | UserLoginSuccess
  | UserLoginError

  | UserRegisterStart
  | UserRegisterSuccess
  | UserRegisterError

  | UserRegisterConfirmStart
  | UserRegisterConfirmSuccess
  | UserRegisterConfirmError

  | UserInitializationStart
  | UserInitializationSuccess
  | UserInitializationError

  | UserTokenInitializesStore

  | UserLogout

  | UserChangePasswordStart
  | UserChangePasswordSuccess
  | UserChangePasswordError

  | UserUpdated
  ;
