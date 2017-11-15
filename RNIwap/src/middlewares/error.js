import { isPromise, oneOfType } from '../utils';
import { GLOBAL_ERROR } from '../actions/types';

export default function globalErrorMiddleware () {
  return next => action => {
    const types = [
      GLOBAL_ERROR
    ];

    console.log('error middleware', action, isPromise(action.payload), oneOfType(action.type, types));

    if (!isPromise(action.payload)) {
      return next(action);
    }

    if (oneOfType(action.type, types)) {
      console.log('caught');
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