import * as actions from './actions';
import {User} from "./models/user.model";
import {USER_REGISTER_CONFIRM_ERROR, USER_REGISTER_CONFIRM_SUCCESS} from "./actions";
import {ValueTypes} from "ol/style/expressions";

export enum AccountConfirmationActions {
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
}

const initialState: State = {
  token: null,
  loginErrors: {},
  user: null,

  registerErrors: {},
  accountActivationAction: AccountConfirmationActions.NONE
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

      //debugger
      return {
        ...state,
        token: action.token,
        loginErrors: {},
        accountActivationAction: AccountConfirmationActions.NONE
      }

    case actions.USER_LOGIN_ERROR:
      //debugger
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

    default:

      return state;
  }

}
