import * as testActions from './test';
import * as authActions from './auth';

let actions = { ...testActions, ...authActions };

export default actions;