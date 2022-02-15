import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as clientReducer from './client/data/reducer';


export interface State {
  client: clientReducer.State,
  security: securityReducer.State,
  core: coreReducer.State
}
