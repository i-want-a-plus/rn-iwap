import { isPromise, oneOfType } from '../utils';
import { GLOBAL_ERROR } from '../actions/types';
import showErrorToast from '../components/ErrorToast';
import _ from 'lodash';

export default function globalErrorMiddleware () {
  return next => action => {
    const types = [
      GLOBAL_ERROR
    ];

    if (action && action.type === GLOBAL_ERROR && action.payload) {
      showErrorToast(_.get(action.payload, '0.message'));
    }

    if (!isPromise(action.payload)) {
      return next(action);
    }

    if (oneOfType(action.type, types)) {
      return next(action).catch(error => {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);
        }

        return error;
      });
    }

    return next(action);
  };
}