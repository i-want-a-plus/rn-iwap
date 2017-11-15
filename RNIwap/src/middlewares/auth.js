import { isPromise, oneOfType } from '../utils';
import { AUTH_CHECK } from '../actions/types';

import actions from '../actions';

export default function authMiddleware () {
  return next => action => {
    const types = [
      `${AUTH_CHECK}_REJECTED`
    ];

    if (oneOfType(action.type, types)) {
      return next(actions.navigateToLoginPage);
    }

    return next(action);
  };
}