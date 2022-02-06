import * as actions from './actions';
import {User} from "./models/user.model";

export interface State
{
  token: string,
  loginErrors: {};
  user: User
}

const initialState: State = {
  token: null,
  loginErrors: {},
  user: null
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
        loginErrors: {}
      }

    case actions.USER_LOGIN_ERROR:
      //debugger
      return {
        ...state,
        token: null,
        loginErrors: action.errors
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

    default:

      return state;
  }

}
