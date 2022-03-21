import * as securityReducer from './security/data/reducer';
import * as coreReducer from './core/data/reducer';
import * as clientReducer from './client/data/reducer';
import * as callsReducer from './client/data/calls/reducer';
import * as adminReducer from './admin/data/reducer';

export interface State {
  client: clientReducer.State,
  calls: callsReducer.State,
  security: securityReducer.State,
  core: coreReducer.State,
  admin: adminReducer.State
}
