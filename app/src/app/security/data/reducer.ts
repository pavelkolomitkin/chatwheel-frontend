import * as actions from './actions';

export interface State
{
  token: string,
  loginErrors: {};
}

const initialState: State = {
  token: null,
  loginErrors: {}
};


export function reducer(state = initialState, action: actions.SecurityActions): State {

  switch (action.type)
  {
    case actions.USER_LOGIN_SUCCESS:

      return {
        ...state,
        token: action.token,
        loginErrors: {}
      }

    case actions.USER_LOGIN_ERROR:

      return {
        ...state,
        token: null,
        loginErrors: action.errors
      };

    default:

      return state;
  }

}
