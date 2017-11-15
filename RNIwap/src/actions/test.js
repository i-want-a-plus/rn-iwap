import * as types from './types';
import { api } from '../services';
import { performAuthCheck } from './auth';

export const test = (fail) => dispatch => dispatch({
  type: types.TEST,
  payload: fail ? Promise.all([
    dispatch(performAuthCheck()),
    api.fetchTestWillFail()
  ]): api.fetchTest()
}).catch(e => {
  dispatch({ type: types.GLOBAL_ERROR, payload: e });
});
