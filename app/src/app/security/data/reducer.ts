import * as actions from './actions';
import {User} from "./models/user.model";
import {USER_REGISTER_CONFIRM_ERROR, USER_REGISTER_CONFIRM_SUCCESS} from "./actions";

export enum AccountConfirmationActions {
  NONE,
  SUCCESS,
  ERROR
}

export enum PasswordChangeActions {
  NONE,
  SUCCESS,
  ERROR
}

export interface State
{
  token: string,
  loginErrors: {},
  user: User,

  registerErrors: {},
  accountActivationAction: AccountConfirmationActions,

  changePasswordErrors: {},

  passwordChangeAction: PasswordChangeActions
}

const initialState: State = {
  token: null,
  loginErrors: {},
  user: null,

  registerErrors: {},
  accountActivationAction: AccountConfirmationActions.NONE,

  changePasswordErrors: {},

  passwordChangeAction: PasswordChangeActions.NONE
};

export function reducer(state = initialState, action: actions.SecurityActions): State {

  switch (action.type)
  {
    case actions.USER_TOKEN_INITIALIZE_STORE:

      return {
        ...state,
        token: action.token
      };

    case actions.USER_LOGIN_SUCCESS:


      return {
        ...state,
        token: action.token,
        loginErrors: {},
        accountActivationAction: AccountConfirmationActions.NONE
      }

    case actions.USER_LOGIN_ERROR:

      return {
        ...state,
        token: null,
        loginErrors: action.errors,
        accountActivationAction: AccountConfirmationActions.NONE
      };


    case actions.USER_INITIALIZATION_SUCCESS:

      return {
        ...state,
        user: action.user
      };

    case actions.USER_INITIALIZATION_ERROR:

      return {
        ...state,
        user: null,
        token: null,
      };

    case actions.USER_REGISTER_SUCCESS:

      return {
        ...state,
        registerErrors: {},
        accountActivationAction: AccountConfirmationActions.NONE
      };

    case actions.USER_REGISTER_ERROR:

      return {
        ...state,
        registerErrors: action.errors,
        accountActivationAction: AccountConfirmationActions.NONE
      };

    case actions.USER_REGISTER_CONFIRM_SUCCESS:

      return {
        ...state,
        accountActivationAction: AccountConfirmationActions.SUCCESS
      };

    case actions.USER_REGISTER_CONFIRM_ERROR:

      return {
        ...state,
        accountActivationAction: AccountConfirmationActions.ERROR
      };

    case actions.USER_CHANGE_PASSWORD_START:

      return {
        ...state,
        changePasswordErrors: {},
        passwordChangeAction: PasswordChangeActions.NONE,
      };

    case actions.USER_CHANGE_PASSWORD_SUCCESS:

      return {
        ...state,
        changePasswordErrors: {},
        passwordChangeAction: PasswordChangeActions.SUCCESS
      };

    case actions.USER_CHANGE_PASSWORD_ERROR:

      return {
        ...state,
        changePasswordErrors: action.errors,
        passwordChangeAction: PasswordChangeActions.ERROR
      };

    case actions.USER_UPDATED:

      return {
        ...state,
        user: action.user
      };

    case actions.USER_LOGOUT:

      return {
        ...state,
        user: null,
        token: null
      };

    default:

      return state;
  }

}
